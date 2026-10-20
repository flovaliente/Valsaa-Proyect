import { Router } from 'express';

import orderController from '../controllers/orderController.js';
import { optionalAuth } from '../middlewares/optionalAuth.js';

const router = Router();

// -Costos de envío y locales para retirar
router.get('/shipping-options', orderController.getShippingOptions);

// -Crear orden (con cuenta o como invitado)
router.post('/', optionalAuth, orderController.createOrder);

// -Pagar orden (pago simulado)
router.post('/:code/pay', orderController.payOrder);

export default router;
