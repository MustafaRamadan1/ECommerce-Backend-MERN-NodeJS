import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';

import protect from '../middlewares/auth.middleware';

import checkRole from '../middlewares/isAdmin.middleware'

import {userValidator}   from '../validation/index'

import checkChangePassword from '../middlewares/checkPassword.middleware'

import uploadTools from '../utils/uploadImages';
const router = express.Router();

router.patch('/activate/:token', validation(userValidator.activateUser), authController.activateUser);
router.post('/signUp',  validation(userValidator.signup) , authController.signUp);

router.get('/', protect, checkChangePassword,  checkRole('user'),   userController.getAllUsers);

router.post('/login',validation(userValidator.login), authController.login);
router.patch('/updatePassword', validation(userValidator.updatePassword), protect, authController.updatePassword );
router.post('/forgetPassword', validation(userValidator.forgetPasswordForEmail),  authController.sendEmailForgetPassword);
router.patch('/forgetPassword/:token', validation(userValidator.forgetPasswordToken),  authController.forgetPassword);
router.patch('/updatePassword', validation(userValidator.updatePassword), protect, authController.updatePassword );
router.post('/forgetPassword', validation(userValidator.forgetPasswordForEmail),  authController.sendEmailForgetPassword);
router.patch('/forgetPassword/:token', validation(userValidator.forgetPasswordToken),  authController.forgetPassword);
router.patch('/updateMe', protect,uploadTools.uploadImages([{name:'photo', maxCount: 1}, {name: 'images', maxCount: 5}]), uploadTools.resizeImages, userController.updateMe);

export default router;