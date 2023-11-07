import {promisify} from 'util';
import * as jwt from "jsonwebtoken";
import User from "../DB/models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

 
const protect = catchAsync(async (req, res , next)=>{

  //1) check there's token in the header or no and get it  
  let token="";

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  {

    token = req.headers.authorization.split(' ')[1];
  }
  
  console.log(token);
  if (!token) return next(new AppError('You are not logged in! Please log in to get access', 401));

  //2) verify the token , if it valid or no and if it expire or no 

  const decoded = await promisify(jwt.verify)(token, process.env.SECERTKEY);
  //3) after verfiy the token and it's valid and not expire we'll have the payload and by the id we'll check if we have user with this id

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) return next(new AppError('The user no longer exist', 401));
  //4) check if the user change the password after we send the token of it if he didn't so we go to the next protected middleware

  if(freshUser.changePassword(decoded.iat)) return next(new AppError('User recently changed password! Please login again', 401));

  req.user = freshUser;
  next();
});

export default protect;
