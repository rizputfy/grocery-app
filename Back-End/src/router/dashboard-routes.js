import express from 'express';
import dashboardController from '../controller/dashboard-controller.js';
import { authentication } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/dashboard/count-order', authentication, dashboardController.countOrder);
router.get('/dashboard/count-user', authentication, dashboardController.countUser);
router.get('/dashboard/count-product', authentication, dashboardController.countProduct);
router.get('/dashboard/total-price', authentication, dashboardController.getTotalPriceSum);
router.get('/dashboard/count-order-status', authentication, dashboardController.getOrderStatusCounts);
router.get('/dashboard/total-quantity-sold', authentication, dashboardController.getTotalQuantitySold);

export default router;