import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';

import protect from '../middlewares/auth.middleware';

import checkRole from '../middlewares/isAdmin.middleware'

import {userValidator}   from '../validation/index'

import checkChangePassword from '../middlewares/checkPassword.middleware'

const router = express.Router();

router.patch('/activate/:token', authController.activateUser);
router.post('/signUp',  validation(userValidator.signup) , authController.signUp);

router.get('/', protect, checkChangePassword,  checkRole('user'),   userController.getAllUsers);

router.post('/login',validation(userValidator.login), authController.login);
router.patch('/updatePassword', protect, authController.updatePassword );
router.post('/forgetPassword', authController.sendEmailForgetPassword);
router.patch('/forgetPassword/:token', authController.forgetPassword);

export default router;