import { http } from './http';

export const getProducts = async (category) => {
    const params = new URLSearchParams({ limit: 100 });
    if (category) params.set('category', category);

    const data = await http(`/api/products?${params}`);
    return data.payload.docs;
};

export const getProductById = (id) => http(`/api/products/${id}`);

// Las imágenes de los productos las sirve el server en /img/products
export const productImage = (product, index = 0) =>
    product?.thumbnails?.[index] ? `/img/products/${product.thumbnails[index]}` : undefined;
