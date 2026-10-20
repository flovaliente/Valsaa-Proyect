// Carga el catálogo inicial en la base indicada por URI (o URI_TEST con --test).
// Es idempotente: actualiza los productos por su código, así que se puede correr varias veces.
// Uso: npm run seed            (base de desarrollo)
//      npm run seed -- --test  (base de tests)
import mongoose from "mongoose";
import dotenv from "dotenv";

import productModel from "../dao/models/productModel.js";
import products from "./products.data.js";

dotenv.config();

const useTestDb = process.argv.includes("--test");
const uri = useTestDb ? process.env.URI_TEST : process.env.URI;

if (!uri) {
    console.error(`Falta ${useTestDb ? "URI_TEST" : "URI"} en el .env`);
    process.exit(1);
}

try {
    await mongoose.connect(uri);

    const result = await productModel.bulkWrite(products.map(product => ({
        updateOne: {
            filter: { code: product.code },
            update: { $set: product },
            upsert: true,
        },
    })));

    console.log(`Base "${mongoose.connection.name}": ${result.upsertedCount} productos nuevos, ${result.modifiedCount} actualizados.`);
} catch (error) {
    console.error("Error cargando el catálogo:", error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
