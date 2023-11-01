import express from 'express';

import {userController} from '../controllers/index'

import validation from '../middlewares/validation';


import userValidationSchemas   from '../validation/index'

const router = express.Router();


router.post('/signUp',  validation(userValidationSchemas.signup) , userController.signUp);

router.get('/', userController.protect, userController.restrictTo,  userController.getAllUsers);

router.post('/login',validation(userValidationSchemas.login), userController.login);

export default router;