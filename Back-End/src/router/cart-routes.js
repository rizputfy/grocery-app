import express from 'express';
import { authentication } from '../middleware/auth-middleware.js';
import cartController from '../controller/cart-controller.js';
const router = express.Router();

router.get('/carts', authentication, cartController.getCarts);
router.post('/carts', authentication, cartController.createCart);
router.put('/carts/:cartId', authentication, cartController.updateCart);
router.delete('/carts/:cartId', authentication, cartController.deleteCart);


export default router