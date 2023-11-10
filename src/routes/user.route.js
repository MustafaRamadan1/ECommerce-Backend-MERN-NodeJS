import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';

import protect from '../middlewares/auth.middleware';

import isAdmin from '../middlewares/isAdmin.middleware';

import {userValidator}   from '../validation/index'

const router = express.Router();


router.post('/signUp',  validation(userValidationSchemas.userValidator.signup) , authController.signUp);

router.get('/', protect, isAdmin,   userController.getAllUsers);

router.post('/login',validation(userValidator.login), authController.login);

export default router;