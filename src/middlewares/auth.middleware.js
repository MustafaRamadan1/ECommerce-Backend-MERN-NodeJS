import {promisify} from 'util';
import * as jwt from "jsonwebtoken";
import User from "../DB/models/user.model";
import Session from '../DB/models/session.model';
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import crypto from 'crypto';


const hashToken = token => crypto.createHash('sha256').update(token).digest('hex');

 
const protect = catchAsync(async (req, res , next)=>{

  //1) check there's token in the header or no and get it  
  let token="";

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  {

    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) return next(new AppError('You are not logged in! Please log in to get access', 401));

  //2) verify the token , if it valid or no and if it expire or no 

  const decoded = await promisify(jwt.verify)(token, process.env.SECERTKEY);
  //3) after verfiy the token and it's valid and not expire we'll have the payload and by the id we'll check if we have user with this id

  console.log('the decoded Object is');
  console.log(decoded);

  const userSession = await Session.findOne({userId: decoded.id, tokenId: decoded.tokenId});

  if (!userSession) return next(new AppError('You are not logging Please login Again', 400));

  if (!userSession.valid) return next(new AppError(`You Logged Out , Please login Again`, 400));

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) return next(new AppError('The user no longer exist', 401));
  //4) check if the user change the password after we send the token of it if he didn't so we go to the next protected middleware

  if(freshUser.changePassword(decoded.iat)) return next(new AppError('User recently changed password! Please login again', 401));

  req.user = freshUser;
  next();
});

export default protect;
