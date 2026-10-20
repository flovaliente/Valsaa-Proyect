import orderModel from "./models/orderModel.js";
import productModel from "./models/productModel.js";

export default class OrderDao{
    createOrder = async (order) =>{
        return await orderModel.create(order);
    }

    findOrderByCode = async (code) =>{
        return await orderModel.findOne({ code });
    }

    updateOrder = async (code, changes) =>{
        return await orderModel.findOneAndUpdate({ code }, { $set: changes }, { new: true });
    }

    findProductsByIds = async (ids) =>{
        return await productModel.find({ _id: { $in: ids } }).lean();
    }

    // Descuenta stock solo si alcanza (la condición y la resta son una sola operación atómica,
    // así dos compras simultáneas no pueden dejar el stock en negativo). Devuelve null si no alcanzó.
    decrementStock = async (productId, quantity) =>{
        return await productModel.findOneAndUpdate(
            { _id: productId, stock: { $gte: quantity } },
            { $inc: { stock: -quantity } },
            { new: true }
        );
    }

    incrementStock = async (productId, quantity) =>{
        return await productModel.findByIdAndUpdate(productId, { $inc: { stock: quantity } });
    }
}
