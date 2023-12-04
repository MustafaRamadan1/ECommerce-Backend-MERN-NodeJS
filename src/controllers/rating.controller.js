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

});


const updateRating =  catchAsync(async (req, res , next)=>{
    const {id} = req.params;

    console.log(id);
    
    const rating  = await Rating.findByIdAndUpdate(id, req.body, {
        new: true, runValidators: true
    });
    
    console.log(rating);
    res.status(200).json({
        status: 'success',
        message: 'Rating Updated',
        data: {
            rating 
        }
    })
});


const deleteRating = catchAsync(async (req, res , next)=>{

    const {id} = req.params;

    await Rating.findByIdAndDelete(id);

    res.status(204).json({
        status: 'success',
        message: 'Deleted Success'
    })
})



export default {createRating, updateRating, deleteRating};