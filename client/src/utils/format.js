// Formatea un precio como en el sitio original: 3200 -> "3.200"
export const formatPrice = (price) => Number(price).toLocaleString('es-UY');
