import {promisify} from 'util';
import AppError from "../utils/appError";
import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync';
const checkChangePassword = catchAsync(async (req, res ,next) =>{

       const decoded = await promisify(jwt.verify)(req.headers.authorization.split(' ')[1], process.env.SECERTKEY);
       console.log(decoded);
      if(req.user.changePassword(decoded.iat))
       return next(new AppError('User recently changed password! Please login again', 401));
    next();
});

export default checkChangePassword