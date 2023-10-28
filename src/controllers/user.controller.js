import User from "../DB/models/user.model";

import * as jwt from "jsonwebtoken";

import catchAsync from "../utils/catchAsync";

import AppError from "../utils/appError";


const signToken = (payload) => {

    return jwt.sign(payload, process.env.SECERTKEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};

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

 
  const token =  signToken({ id: user._id })
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

   
  const token =  signToken({ id: user._id })


  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export default {
  signUp,
  getAllUsers,
  login,
};
