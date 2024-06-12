import express from 'express';
import ongkirController from '../controller/ongkir-controller.js';
import { authentication } from '../middleware/auth-middleware.js';
const router = express.Router();

router.get('/province', ongkirController.province);
router.get('/city/:provinceId', ongkirController.city);
router.post('/cost', authentication, ongkirController.cost);

export default router