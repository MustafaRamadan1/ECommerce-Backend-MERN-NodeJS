import User from '../models/userModel';

import * as jwt from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';

export const signUp = catchAsync(async (req, res, next) =>{
    
    console.log('here is signUp');

    res.status(200).json({
        status: 'success',
    })
})







