// Catálogo inicial de Valsaa (precios en UYU).
// Fuente: el sitio estático original (legacy/sitio-estatico/sections/shop.html)
// y los códigos de artículo del proyecto React (client/public/productos.json).
// Las imágenes están en server/public/img/products/.

const products = [
    { title: "Camisa Mango", price: 2100, category: "Camisa", code: "CAM-MGO-122", thumbnails: ["prod1.jpg"] },
    { title: "Pantalon Hanna", price: 3200, category: "Pantalon", code: "PANT-HAN-656", thumbnails: ["prod2.jpg"] },
    { title: "Campera Nala", price: 3600, category: "Campera", code: "CAMP-NAL-542", thumbnails: ["prod3.jpg"] },
    { title: "Blusa Flowers", price: 2800, category: "Blusa", code: "BL-FL-021", thumbnails: ["prod4.jpg"] },
    { title: "Camisa Colors", price: 3250, category: "Camisa", code: "CAM-CO-421", thumbnails: ["prod5.jpg"] },
    { title: "Red Brisa", price: 3450, category: "Red", code: "RED-BR-142", thumbnails: ["prod6.jpg"] },
    { title: "Pantalon Leah", price: 4500, category: "Pantalon", code: "PANT-LE-478", thumbnails: ["prod7.jpg"] },
    { title: "Jean Cava", price: 3900, category: "Pantalon", code: "JN-CAV-254", thumbnails: ["prod8.jpg"] },
    { title: "Vestido Shan", price: 8100, category: "Vestido", code: "VEST-SH-458", thumbnails: ["prod9.jpg"] },
    { title: "Vestido Lio", price: 7650, category: "Vestido", code: "VEST-LIO-422", thumbnails: ["prod10.jpg"] },
    { title: "Chaleco Amade", price: 3900, category: "Chaleco", code: "CH-AMA-685", thumbnails: ["prod21.jpg", "prod21_2.jpg"] },
    { title: "Buzo Ibiza", price: 3590, category: "Buzo", code: "BZ-IBI-157", thumbnails: ["prod22.jpg", "prod22_2.jpg"] },
    { title: "Pollera Alma", price: 2990, category: "Pollera", code: "POLL-ALM-758", thumbnails: ["prod23.jpg", "prod23_2.jpg"] },
    { title: "Pantalon Chick", price: 4200, category: "Pantalon", code: "PANT-CHI-365", thumbnails: ["prod25.jpg", "prod25_2.jpg"] },
    { title: "Bermuda Golden", price: 4550, category: "Pantalon", code: "BER-GOL-769", thumbnails: ["prod11.jpg"] },
    { title: "Chaleco Denver", price: 3350, category: "Chaleco", code: "CH-DEN-301", thumbnails: ["prod26.jpg"] },
    { title: "Bota Tracto", price: 8200, category: "Calzado", code: "BO-TRAC-357", thumbnails: ["prod13.jpg"] },
    { title: "Bota Flanco", price: 9100, category: "Calzado", code: "BO-FL-985", thumbnails: ["prod24.jpg", "prod24_2.jpg"] },
    { title: "Bota Cairo", price: 7150, category: "Calzado", code: "BO-CAI-412", thumbnails: ["prod14.jpg"] },
    { title: "Sandalia Red - Rojo", price: 6990, category: "Calzado", code: "SAN-RED-879", thumbnails: ["prod16.jpg"] },
    { title: "Sandalia Red - Marrón", price: 6990, category: "Calzado", code: "SAN-RED-880", thumbnails: ["prod17.jpg"] },
    { title: "Sandalia Gigi", price: 6250, category: "Calzado", code: "SAN-GIG-523", thumbnails: ["prod18.jpg"] },
    { title: "Bota Tracto Mini", price: 7800, category: "Calzado", code: "BO-TRM-358", thumbnails: ["prod19.jpg"] },
    { title: "Bota Plata", price: 9590, category: "Calzado", code: "BO-PLA-634", thumbnails: ["prod20.jpg"] },
];

export default products.map(product => ({
    ...product,
    description: `${product.title}, de la colección Valsaa.`,
    stock: 10,
}));
