import Rating from "../DB/models/rating.model";
import catchAsync from '../utils/catchAsync';


const createRating = catchAsync(async (req, res , next)=>{

    const {comment, rating, product, user} = req.body;


    const newRating = await Rating.create({comment,rating, product, user});

    res.status(200).json({

        status: 'success',
        data: {
            data: newRating
        }
    })

})



export default {createRating};