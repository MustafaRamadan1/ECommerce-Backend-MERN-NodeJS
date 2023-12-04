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
}, {
    timestamps: true
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

 if (states.length > 0)
 {
    await Product.findByIdAndUpdate(productId,{
        ratingAverage: states[0].RatingAverage,
        ratingQuantity: states[0].RatingsNum
      });
    
 } else{
    
    await Product.findByIdAndUpdate(productId,{
        ratingAverage: 4.5,
        ratingQuantity: 0
      });
 }
};

ratingSchema.post('save', function(docs, next){

    this.constructor.getRatingAverage(this.product);
    next();
});


ratingSchema.post(/findOneAnd/, function(docs, next){

    docs.constructor.getRatingAverage(docs.product);
    next();
})

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;