import express from 'express';
import { authentication } from '../middleware/auth-middleware.js';
import orderController from '../controller/order-controller.js';
const router = express.Router();


router.get('/orders/filter-status', authentication, orderController.filterOrdersByStatus);
router.post('/orders/midtrans-web-hook', orderController.midtransWebhook);
router.post('/orders/cancel-transaction', authentication, orderController.cancelTransaction);
router.post('/orders', authentication, orderController.createOrder);
router.get('/orders', authentication, orderController.getOrders);
router.get('/orders/:orderId', authentication, orderController.getOrder);


export default router