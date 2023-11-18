import mongoose, { mongo } from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId:{
        type: String,
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


const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;