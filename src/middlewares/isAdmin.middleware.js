
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import User from "../DB/models/user.model";



// const  restrictTo = catchAsync(async (req, res , next)=>{

//   if (req.user.role !== 'admin')
//   {
//     return next(new AppError('You do not have permission to perform this action', 403));
//   }

//   next();
// })


const checkRole = (role) => catchAsync(async(req, res , next)=>{

  const user = await User.findById(req.user._id);

  if (user.role !== role)
  {
    return next(new AppError('You do not have permission to perform this action', 403));
  }

 next();
})
export default checkRole
