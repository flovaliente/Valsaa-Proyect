import crypto from "crypto";
import mongoose from "mongoose";
import OrderRepository from "../dao/repositories/OrderRepository.js";
import UserRepository from "../dao/repositories/UserRepository.js";

const orderManager = new OrderRepository();
const userManager = new UserRepository();

export const SHIPPING_COST = 250;
export const FREE_SHIPPING_FROM = 5000;
export const STORES = ["pocitos", "punta-del-este"];

// Tarjeta de prueba que el pago simulado siempre rechaza (termina en 0002)
const DECLINED_LAST4 = "0002";

// Error con código HTTP, para que el controller sepa qué responder
export class OrderError extends Error {
    constructor(message, status = 400, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

const isFilled = (value) => typeof value === "string" && value.trim().length > 0;

const generateOrderCode = () => `VAL-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

const validateBuyer = (buyer) => {
    const fields = ["firstName", "lastName", "email", "phone"];
    const missing = fields.filter(field => !isFilled(buyer?.[field]));
    if (missing.length > 0) {
        throw new OrderError("Missing buyer data.", 400, { missing });
    }
    if (!/^\S+@\S+\.\S+$/.test(buyer.email)) {
        throw new OrderError("Invalid email.");
    }
    return {
        firstName: buyer.firstName.trim(),
        lastName: buyer.lastName.trim(),
        email: buyer.email.trim().toLowerCase(),
        phone: buyer.phone.trim(),
    };
};

const validateShipping = (shipping) => {
    if (shipping?.method === "pickup") {
        if (!STORES.includes(shipping.store)) {
            throw new OrderError("Invalid store.");
        }
        return { method: "pickup", store: shipping.store };
    }

    if (shipping?.method === "delivery") {
        const { street, apartment, city, department } = shipping.address ?? {};
        if (![street, city, department].every(isFilled)) {
            throw new OrderError("Missing shipping address.");
        }
        return {
            method: "delivery",
            address: { street: street.trim(), apartment: apartment?.trim() ?? "", city: city.trim(), department: department.trim() },
        };
    }

    throw new OrderError("Invalid shipping method.");
};

// Arma los ítems con los precios de la base de datos: lo que manda el navegador
// (precio, título) se ignora, porque cualquiera puede modificarlo.
const buildItems = async (rawItems) => {
    const isValid = Array.isArray(rawItems) && rawItems.length > 0 && rawItems.every(item =>
        mongoose.isValidObjectId(item?.productId) && Number.isInteger(item.quantity) && item.quantity > 0
    );
    if (!isValid) {
        throw new OrderError("items must be a non-empty array of { productId, quantity }.");
    }

    // Si el mismo producto viene dos veces, se suman las cantidades
    const quantities = new Map();
    for (const item of rawItems) {
        const id = String(item.productId);
        quantities.set(id, (quantities.get(id) ?? 0) + item.quantity);
    }
    const items = [...quantities].map(([productId, quantity]) => ({ productId, quantity }));

    const products = await orderManager.findProductsByIds(items.map(item => item.productId));
    const byId = new Map(products.map(product => [String(product._id), product]));

    const notFound = items.filter(item => !byId.has(String(item.productId)));
    if (notFound.length > 0) {
        throw new OrderError("Some products do not exist.", 400, { notFound: notFound.map(item => item.productId) });
    }

    const outOfStock = items
        .filter(item => byId.get(String(item.productId)).stock < item.quantity)
        .map(item => ({ productId: item.productId, available: byId.get(String(item.productId)).stock }));
    if (outOfStock.length > 0) {
        throw new OrderError("Not enough stock.", 409, { outOfStock });
    }

    return items.map(item => {
        const product = byId.get(String(item.productId));
        return { product: product._id, title: product.title, code: product.code, price: product.price, quantity: item.quantity };
    });
};

export const calculateShippingCost = (method, subtotal) =>
    method === "pickup" || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;

const createOrder = async ({ items, buyer, shipping }, user) => {
    const orderItems = await buildItems(items);
    const validBuyer = validateBuyer(buyer);
    const validShipping = validateShipping(shipping);

    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = calculateShippingCost(validShipping.method, subtotal);

    const order = await orderManager.createOrder({
        code: generateOrderCode(),
        items: orderItems,
        subtotal,
        shippingCost,
        total: subtotal + shippingCost,
        buyer: { ...validBuyer, user: user?._id ?? null },
        shipping: validShipping,
    });

    // Si compró con cuenta, se guardan teléfono y dirección para la próxima compra
    if (user?._id) {
        const data = { phone: validBuyer.phone };
        if (validShipping.method === "delivery") data.shippingAddress = validShipping.address;
        await userManager.updateCheckoutData(user._id, data);
    }

    return order;
};

// Descuenta el stock de todos los ítems; si alguno no alcanza, devuelve lo ya descontado.
const reserveStock = async (items) => {
    const reserved = [];
    for (const item of items) {
        const updated = await orderManager.decrementStock(item.product, item.quantity);
        if (!updated) {
            for (const done of reserved) {
                await orderManager.incrementStock(done.product, done.quantity);
            }
            return false;
        }
        reserved.push(item);
    }
    return true;
};

// Pago simulado: no se cobra nada. El client solo manda la marca y los últimos 4 dígitos
// (en una pasarela real el número completo nunca pasa por nuestro server).
const payOrder = async (code, { cardBrand, cardLast4 } = {}) => {
    if (!/^\d{4}$/.test(cardLast4 ?? "") || !isFilled(cardBrand)) {
        throw new OrderError("Invalid card data.");
    }

    const order = await orderManager.findOrderByCode(code);
    if (!order) {
        throw new OrderError("Order not found.", 404);
    }
    if (order.status !== "pending_payment") {
        throw new OrderError("Order is not pending payment.", 409);
    }

    if (cardLast4 === DECLINED_LAST4) {
        await orderManager.updateOrder(code, { "payment.status": "rejected", "payment.cardBrand": cardBrand, "payment.cardLast4": cardLast4 });
        throw new OrderError("Payment rejected.", 402, { reason: "card_declined" });
    }

    // El stock se descuenta recién cuando el pago se aprueba
    const hasStock = await reserveStock(order.items);
    if (!hasStock) {
        await orderManager.updateOrder(code, { status: "cancelled", "payment.status": "rejected" });
        throw new OrderError("Not enough stock.", 409, { reason: "out_of_stock" });
    }

    return await orderManager.updateOrder(code, {
        status: "paid",
        "payment.status": "approved",
        "payment.cardBrand": cardBrand,
        "payment.cardLast4": cardLast4,
        "payment.paidAt": new Date(),
    });
};

export default {
    createOrder,
    payOrder,
};
