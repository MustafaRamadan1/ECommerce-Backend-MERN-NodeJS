import {promisify} from 'util';
import * as jwt from "jsonwebtoken";
import User from "../DB/models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

import AppFeature
 from '../utils/appFeature';
const getAllUsers = catchAsync(async (req, res, next) => {
 
  const appFeature = new AppFeature(User.find(), req.query).filter().sort().limitFields().pagination(2);


  const users = await appFeature.query.populate('cart');

  if (!users) return next(new AppError(`There's No Users`, 404));
  res.status(200).json({
    status: "success",
    result: users.length, 
    data: {
      users,
    },
  });
});

 




export default {
  getAllUsers,
};
