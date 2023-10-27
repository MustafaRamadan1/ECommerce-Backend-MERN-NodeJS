import User from '../DB/models/user.model';

import * as jwt from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';

const signUp = catchAsync(async (req, res, next) =>{
    
    console.log('here is signUp');

    res.status(200).json({
        status: 'success',
    })
})




export default {
    signUp
}




