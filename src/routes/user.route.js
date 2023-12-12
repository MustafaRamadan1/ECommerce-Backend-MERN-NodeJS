import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';

import protect from '../middlewares/auth.middleware';

import checkRole from '../middlewares/isAdmin.middleware'

import {userValidator}   from '../validation/index'

<<<<<<< Updated upstream
=======
import checkChangePassword from '../middlewares/checkPassword.middleware'
import uploadTools from '../utils/uploadImages';
>>>>>>> Stashed changes
const router = express.Router();

router.patch('/activate/:token', authController.activateUser);
router.post('/signUp',  validation(userValidator.signup) , authController.signUp);

router.get('/', protect, checkRole('user'),   userController.getAllUsers);

router.post('/login',validation(userValidator.login), authController.login);
<<<<<<< Updated upstream
router.post('/updatePassword', protect, authController.updatePassword );
router.patch('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
=======
router.patch('/updatePassword', validation(userValidator.updatePassword), protect, authController.updatePassword );
router.post('/forgetPassword', validation(userValidator.forgetPasswordForEmail),  authController.sendEmailForgetPassword);
router.patch('/forgetPassword/:token', validation(userValidator.forgetPasswordToken),  authController.forgetPassword);
router.patch('/updateMe', protect,uploadTools.uploadImages([{name:'photo', maxCount: 1}, {name: 'images', maxCount: 5}]), uploadTools.resizeImages, userController.updateMe);
>>>>>>> Stashed changes

export default router;