import express from 'express';
import { authentication } from '../middleware/auth-middleware.js';
import productsController from '../controller/products-controller.js';
import { uploadProduct } from '../middleware/upload-middleware.js';
const router = express.Router();

router.post('/products', authentication, uploadProduct.single('image'), productsController.createProduct);
router.get('/products', authentication, productsController.getProducts);
router.get('/products/category/:category', authentication, productsController.getProductByCategory);
router.get('/products/:productId', authentication, productsController.getProduct);
router.put('/products/:productId', authentication, uploadProduct.single('image'), productsController.updateProduct);
router.delete('/products/:productId', authentication, productsController.deleteProduct);



export default router