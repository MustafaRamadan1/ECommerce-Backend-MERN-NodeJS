import express from 'express';

import {userController} from '../controllers/index'



const router = express.Router();


router.post('/signUp', userController.signUp);

router.get('/getAllUsers', userController.getAllUsers);

export default router;