import express from 'express';
import { authentication } from '../middleware/auth-middleware.js';
import userController from '../controller/user-controller.js';
import { uploadUser } from '../middleware/upload-middleware.js';
const router = express.Router();

router.post('/users', authentication, userController.createUser);
router.put('/users/:userId', authentication, userController.updateUser);
router.put('/users/update-profile/:userId', authentication, uploadUser.single('image'), userController.updateProfile);
router.delete('/users/:userId', authentication, userController.deleteUser);
router.get('/users/:userId', authentication, userController.getUser);
router.get('/users', authentication, userController.getUsers);
router.post('/logout', authentication, userController.logout);
router.post('/users/change-password', authentication, userController.changePassword);

export default router