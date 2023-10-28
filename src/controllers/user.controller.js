import User from '../DB/models/user.model';

import * as jwt from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';


import AppError from '../utils/appError';

const signUp = catchAsync(async (req, res, next) =>{
    

    const {name , email, password, confirmPassword, DOB} = req.body;

    if (!req.body) return next(new AppError('Please provide all fields', 400));

    const user = await User.create({
        name , email, password, confirmPassword, DOB
    });

    if(!user)   return next(new AppError(`Can't create user`, 400));

   const token  = jwt.sign({id: user._id}, process.env.SECERTKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
   });


   res.status(200).json({
    status: 'success',
    token, 
    date: {
        user
    }
   })

})


const getAllUsers = catchAsync(async (req, res , next)=>{

    const users = await User.find();

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
})



export default {
    signUp,
    getAllUsers
}




