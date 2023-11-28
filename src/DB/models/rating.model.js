import mongoose from 'mongoose';
import Product from './product.model';

const ratingSchema = new mongoose.Schema({

    comment:{
        type: String,
        trim: true, 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    product: {
        type: String,
        ref: 'Product'
    }
});

ratingSchema.statics.getRatingAverage = async function(productId){

  const states =  await this.aggregate([
    {
        $match: {product: productId}
    },
    {
        $group:{
            _id: '$product',
            'RatingsNum':{$sum: 1},
            'RatingAverage': {$avg: '$rating'}
        }
    }
  ]);

  console.log(states);

  await Product.findByIdAndUpdate(this.tour,{
    ratingAverage: states[0].RatingAverage,
    ratingQuantity: states[0].RatingsNum
  });

};

ratingSchema.post('save', function(docs, next){

    this.constructor.getRatingAverage(this.product);
    next();
})


const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;