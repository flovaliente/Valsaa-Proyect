import OrderDao from "../orderDAO.js";

class OrderRepository{
    constructor(){
        this.orderDao = new OrderDao();
    }

    async createOrder(order){
        try {
            return await this.orderDao.createOrder(order);
        } catch (error) {
            console.error(error.message);
            throw new Error('Error creating order.');
        }
    }

    async findOrderByCode(code){
        try {
            return await this.orderDao.findOrderByCode(code);
        } catch (error) {
            console.error(error.message);
            throw new Error('Error finding order.');
        }
    }

    async updateOrder(code, changes){
        try {
            return await this.orderDao.updateOrder(code, changes);
        } catch (error) {
            console.error(error.message);
            throw new Error('Error updating order.');
        }
    }

    async findProductsByIds(ids){
        try {
            return await this.orderDao.findProductsByIds(ids);
        } catch (error) {
            console.error(error.message);
            throw new Error('Error finding products.');
        }
    }

    async decrementStock(productId, quantity){
        try {
            return await this.orderDao.decrementStock(productId, quantity);
        } catch (error) {
            console.error(error.message);
            throw new Error('Error updating stock.');
        }
    }

    async incrementStock(productId, quantity){
        try {
            return await this.orderDao.incrementStock(productId, quantity);
        } catch (error) {
            console.error(error.message);
            throw new Error('Error updating stock.');
        }
    }
}

export default OrderRepository;
