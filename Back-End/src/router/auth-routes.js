import authController from "../controller/auth-controller.js";
import express from 'express';

const router = express.Router();

router.post('/register', authController.register);
router.get('/set-activate/:email/:userId', authController.setActivateUser);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.get('/valid-token/:token', authController.validToken);
router.patch('/reset-password/:token', authController.resetPassword);


export default router 