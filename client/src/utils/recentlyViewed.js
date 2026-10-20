// Guarda en el navegador los últimos productos que vio el usuario (para el carrusel de la tienda)
const STORAGE_KEY = 'valsaa-recently-viewed';
const MAX_ITEMS = 8;

export const getRecentlyViewed = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
};

export const addRecentlyViewed = (product) => {
    const item = { _id: product._id, title: product.title, price: product.price, thumbnails: product.thumbnails };
    const items = [item, ...getRecentlyViewed().filter(p => p._id !== product._id)].slice(0, MAX_ITEMS);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        // Sin localStorage simplemente no se guarda el historial
    }
};
