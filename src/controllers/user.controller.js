import {promisify} from 'util';
import * as jwt from "jsonwebtoken";
import User from "../DB/models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

import AppFeature
 from '../utils/appFeature';
const getAllUsers = catchAsync(async (req, res, next) => {
 
  const appFeature = new AppFeature(User.find(), req.query).filter().sort().limitFields().pagination(2);


  const users = await appFeature.query;

  if (!users) return next(new AppError(`There's No Users`, 404));
  res.status(200).json({
    status: "success",
    result: users.length, 
    data: {
      users,
    },
  });
});

 
const updateMe = catchAsync(async(req, res , next)=>{

  if(req.body.password ||  req.body.confirmPassword) 
  return next(new AppError('To Update Password Please go to /api/v1/users/updatePassword', 400));

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true});

  if(!user) return next(new AppError('Error in Updating the user Data'));

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
});




export default {
  getAllUsers,
  updateMe
};
