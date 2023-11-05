import {promisify} from 'util';
import * as jwt from "jsonwebtoken";
import User from "../DB/models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, DOB } = req.body;

  if (!req.body) return next(new AppError("Please provide all fields", 400));

  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    DOB,
  });

  if (!user) return next(new AppError(`Can't create user`, 400));

  const token = jwt.sign({ id: user._id }, process.env.SECERTKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    date: {
      user,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);
  const user = await User.findOne({ email }).select("+password -__v");

  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct)
    return next(new AppError("Incorrect email or password", 401));

  const token = jwt.sign({ id: user._id }, process.env.SECERTKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
 
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


const updatePassword = catchAsync(async (req, res , next)=>{

  const {id} = req.params;

  const user = await User.findById(id);

  if (!user) return next(new AppError('The user no longer exist', 401));

  user.password = req.body.password;
  user.passwordChangedAt = Date.now();

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'User changed Password', 
    user
  })
});

const  restrictTo = catchAsync(async (req, res , next)=>{

  if (req.user.role !== 'admin')
  {
    return next(new AppError('You do not have permission to perform this action', 403));
  }

  next();
})

export default {
  signUp,
  login,
  protect,
  restrictTo
};
