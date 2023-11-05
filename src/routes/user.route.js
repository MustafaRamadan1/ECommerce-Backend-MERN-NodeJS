import express from 'express';

import {authController, userController} from '../controllers/index'

import validation from '../middlewares/validation';


import userValidationSchemas   from '../validation/index'

const router = express.Router();


router.post('/signUp',  validation(userValidationSchemas.signup) , authController.signUp);

router.get('/',  userController.getAllUsers);

router.post('/login',validation(userValidationSchemas.login), authController.login);

export default router;