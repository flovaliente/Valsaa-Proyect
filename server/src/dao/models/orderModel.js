import mongoose from "mongoose";

const orderCollection = "orders";

const { Schema } = mongoose;

// Se guarda una copia de título y precio al momento de comprar: si después el producto
// cambia de precio, la orden tiene que seguir mostrando lo que se pagó.
const OrderItem = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "products", required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const Address = new Schema({
    street: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    department: { type: String, required: true },
}, { _id: false });

const orderSchema = new Schema({
    code: { type: String, required: true, unique: true },
    items: { type: [OrderItem], required: true },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    total: { type: Number, required: true },
    buyer: {
        user: { type: Schema.Types.ObjectId, ref: "users", default: null }, // null si compró como invitado
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    shipping: {
        method: { type: String, enum: ["pickup", "delivery"], required: true },
        store: { type: String, enum: ["pocitos", "punta-del-este"] },
        address: { type: Address },
    },
    payment: {
        method: { type: String, enum: ["simulated"], default: "simulated" },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        cardBrand: { type: String },
        cardLast4: { type: String }, // nunca se guarda el número completo de la tarjeta
        paidAt: { type: Date },
    },
    status: { type: String, enum: ["pending_payment", "paid", "cancelled"], default: "pending_payment" },
}, { timestamps: true });

export default mongoose.model(orderCollection, orderSchema);
