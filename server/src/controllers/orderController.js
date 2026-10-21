import orderService, { OrderError, SHIPPING_COST, FREE_SHIPPING_FROM, STORES } from '../services/orderService.js';

const handleError = (req, res, error, fallbackMessage) => {
    if (error instanceof OrderError) {
        return res.status(error.status).send({ status: 'error', message: error.message, details: error.details });
    }
    req.logger.error(`${fallbackMessage} ${error.message}`);
    res.status(500).send({ status: 'error', message: fallbackMessage });
};

// Datos para que el client muestre los mismos costos que va a calcular el server
const getShippingOptions = (req, res) => {
    res.send({
        status: 'success',
        payload: { shippingCost: SHIPPING_COST, freeShippingFrom: FREE_SHIPPING_FROM, stores: STORES }
    });
};

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body, req.user?.user);
        res.status(201).send({ status: 'success', payload: order });
    } catch (error) {
        handleError(req, res, error, 'Error creating order.');
    }
};

const payOrder = async (req, res) => {
    try {
        const order = await orderService.payOrder(req.params.code, req.body);
        res.status(200).send({ status: 'success', payload: order });
    } catch (error) {
        handleError(req, res, error, 'Error paying order.');
    }
};

export default {
    getShippingOptions,
    createOrder,
    payOrder,
};
