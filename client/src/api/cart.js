import { http } from './http';

// Pasa el carrito del navegador al carrito del usuario en el server y genera la compra.
// Devuelve { ticket, notProcessedProd }: los productos sin stock suficiente quedan sin procesar.
export const checkout = async (cartId, items) => {
    const products = items.map(item => ({ productId: item._id, quantity: item.quantity }));
    await http(`/api/carts/${cartId}`, { method: 'PUT', body: { products } });

    const data = await http(`/api/carts/${cartId}/purchase`, { method: 'POST' });
    return data.payload;
};
