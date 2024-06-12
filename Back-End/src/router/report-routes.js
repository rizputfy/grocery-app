import express from 'express';
import reportController from '../controller/report-controller.js';
import { authentication } from '../middleware/auth-middleware.js';
const router = express.Router();

router.post('/report', authentication, reportController.customReport);
router.get('/report/:period', authentication, reportController.report);

export default router