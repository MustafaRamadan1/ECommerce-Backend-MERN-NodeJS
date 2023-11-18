import mongoose, { mongo } from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    cartId:{
        type: mongoose.Schema.ObjectId,
        required: [true, 'Cart must belong to a user'],
    }
}, 
{
    timestamps: true
});


export default cartItemSchema;