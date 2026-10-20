import { http } from './http';

export const getShippingOptions = async () => {
    const data = await http('/api/orders/shipping-options');
    return data.payload;
};

// El server calcula precios y envío: acá solo se mandan productos y cantidades
export const createOrder = async ({ items, buyer, shipping }) => {
    const data = await http('/api/orders', {
        method: 'POST',
        body: {
            items: items.map(item => ({ productId: item._id, quantity: item.quantity })),
            buyer,
            shipping,
        },
    });
    return data.payload;
};

// Pago simulado: solo viajan la marca y los últimos 4 dígitos de la tarjeta
export const payOrder = async (code, { cardBrand, cardLast4 }) => {
    const data = await http(`/api/orders/${code}/pay`, { method: 'POST', body: { cardBrand, cardLast4 } });
    return data.payload;
};
