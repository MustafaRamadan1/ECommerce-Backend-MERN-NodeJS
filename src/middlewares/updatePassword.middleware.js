import jwt from 'jsonwebtoken';
import User from "../DB/models/user.model";
import catchAsync from "../utils/catchAsync";

const updatePassword = catchAsync(async (req, res, next)=>{
    const {currentPassword, newPassword} = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) return next(new AppError('The user no longer exist', 401));

    if ( !user.correctPassword(currentPassword, user.password)) 
    return next(new AppError('Your current password is wrong', 401));

    user.password = newPassword;
    user.passwordChangedAt = Date.now() - 1000;
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.SECERTKEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    }) 


    res.status(200).json({
        status: 'success',
        token,
        user
    })
})


export default updatePassword;