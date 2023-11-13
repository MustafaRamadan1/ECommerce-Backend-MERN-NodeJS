import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';

import protect from '../middlewares/auth.middleware';

import isAdmin from '../middlewares/isAdmin.middleware';

import {userValidator}   from '../validation/index'

const router = express.Router();

router.post('/activate/:token', authController.activateUser);
router.post('/signUp',  validation(userValidator.signup) , authController.signUp);

router.get('/', protect, isAdmin,   userController.getAllUsers);

router.post('/login',validation(userValidator.login), authController.login);
router.post('/updatePassword', protect, authController.updatePassword );
router.post('/forgetPassword', authController.forgetPassword);
router.post('/forgetPassword/:token', authController.resetPassword);

export default router;