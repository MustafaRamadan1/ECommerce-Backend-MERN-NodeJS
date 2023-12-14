import { promisify } from "util";
import crypto from "crypto";
import { v4 as uuidV4 } from "uuid";
import * as jwt from "jsonwebtoken";
import User from "../DB/models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import sendEmail from "../utils/sendEmail";
import { createToken } from "../utils/helperFuncs";
import createQRCode from "../utils/qrCodeGenerator";
import Session from "../DB/models/session.model";
import Email from '../utils/sendEmail'

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, DOB } = req.body;

  if (!req.body) return next(new AppError("Please provide all fields", 400));

  const user = await User.create({
    name,
    email,
    password,
    DOB,
  });

  if (!user) return next(new AppError(`Can't create user`, 400));

  try {
    const activateToken = user.createActivateToken();
    await user.save();

    const qrCodeDesign =
      await createQRCode(`to activate your Account please go to this route
      ${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/activate/${activateToken}`);
      const url  = ` ${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/activate/${activateToken}`

      await new Email(user, url).sendActivate();
    // await sendEmail({
    //   to: user.email,
    //   subject: "Activate your Email in our Website",
    //   text: `to activate your Account please go to this route
    //     ${req.protocol}://${req.get(
    //     "host"
    //   )}/api/v1/users/activate/${activateToken}`,
    // });
    const token = createToken({ id: user._id });

    res.status(200).json({
      status: "success",
      token,
      data: user,
      qrCodeDesign,
    });
  } catch {
    user.activateToken = undefined;
    await user.save();
    return next(
      new AppError(`Couldn't send the email , something went wrong`, 500)
    );
  }
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("Incorrect email or password", 401));
  const correct = await user.correctPassword(password);
  if (!user || !correct)
    return next(new AppError("Incorrect email or password", 401));

  
  if (!user.active)
    return next(new AppError("Please activate your account", 401));

  const tokenId = uuidV4();
  console.log(tokenId);
  const token = createToken({ id: user._id, tokenId });
  const newSession = await Session.create({ userId: user._id, tokenId });

  console.log(newSession);
  res.status(200).json({
    status: "success",
    token,
    data: user,
  });
});

const sendEmailForgetPassword = catchAsync(async (req, res, next) => {
  
  const { email } = req.body;
  
  try {
    
      const user = await User.findOne({ email });
    
      if (!user) return next(new AppError("No user with this Email", 401));
    
      const resetToken = user.createPasswordResetToken();
    
      await user.save();
    const message = `Please go to this route if you want to change your password 
                    ${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/forgetPassword/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: "Reset your Password , It is valid for 10 minutes only ",
      text: message,
    });

    res.status(200).json({
      status: "success",
      message: "Email has been sent",
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(
      new AppError(`Couldn't send the email , something went wrong`, 500)
    );
  }
});

const forgetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const { password, confirmPassword } = req.body;

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or has expired", 401));

  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  const validToken = jwt.sign({ id: user._id }, process.env.SECERTKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token: validToken,
    user,
  });
});

const activateUser = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const activateToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOneAndUpdate(
    { activateToken },
    { active: true },
    { new: true, runValidators: true }
  );

  if (!user) return next(new AppError(" No user with this token", 401));

  res.status(200).json({
    status: "success",
    message: "User has been activated",
    user,
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) return next(new AppError("The user no longer exist", 401));

  if (!user.correctPassword(currentPassword, user.password))
    return next(new AppError("Your current password is wrong", 401));

  user.password = newPassword;
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.SECERTKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});




export default {
  signUp,
  login,
  forgetPassword,
  sendEmailForgetPassword,
  activateUser,
  updatePassword,
};
