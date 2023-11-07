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

export default {
  signUp,
  login
};
