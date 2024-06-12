import Auth from './auth-routes.js'
import Cart from './cart-routes.js'
import Product from './products-routes.js'
import User from './user-routes.js'
import Ongkir from './ongkir-routes.js'
import Order from './order-routes.js'
import Report from './report-routes.js'
import Dashboard from './dashboard-routes.js'

import express from 'express';

const router = express.Router();

router.use('/api-public', Auth)
router.use('/api', Cart)
router.use('/api', Product)
router.use('/api', User)
router.use('/api', Ongkir)
router.use('/api', Order)
router.use('/api', Report)
router.use('/api', Dashboard)

router.use((req, res, next) => {
    res.status(404).json({ errors: "Periksa lagi Endpoint nya mang salahan kayanya" })
})

export default router;