import crypto from 'crypto';
import catchAsync from "../utils/catchAsync";
import User from "../DB/models/user.model";

const activateUser = catchAsync(async (req, res ,next)=>{

    const {token} = req.params;

    const activateToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({activateToken});

    user.active = true;

    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'User has been activated',
        user
    })
})



export default activateUser;