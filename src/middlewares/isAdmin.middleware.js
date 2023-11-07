
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";



const  restrictTo = catchAsync(async (req, res , next)=>{

  if (req.user.role !== 'admin')
  {
    return next(new AppError('You do not have permission to perform this action', 403));
  }

  next();
})

export default restrictTo
