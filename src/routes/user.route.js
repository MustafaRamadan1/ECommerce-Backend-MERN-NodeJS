import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';

import protect from '../middlewares/auth.middleware';

import checkRole from '../middlewares/isAdmin.middleware'

import {userValidator}   from '../validation/index'

const router = express.Router();

router.patch('/activate/:token', authController.activateUser);
router.post('/signUp',  validation(userValidator.signup) , authController.signUp);

router.get('/', protect, checkRole('user'),   userController.getAllUsers);

router.post('/login',validation(userValidator.login), authController.login);
router.post('/updatePassword', protect, authController.updatePassword );
router.patch('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

export default router;