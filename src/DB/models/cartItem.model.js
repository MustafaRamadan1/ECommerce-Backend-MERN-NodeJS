import mongoose, { mongo } from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId:{
        type: String,
        ref: 'Product',
        required: [true, 'Cart Item must has a product'],
    },
    cartId:{
        type: mongoose.Schema.ObjectId,
        required: [true, 'Cart must belong to a user'],
    },
    quantity:{
        type: Number,
        default: 1
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, 
{
    timestamps: true
});


cartItemSchema.methods.toJSON = function(){
    const cartItem = this;

    const cartItemObject = cartItem.toObject();

    delete cartItemObject.__v;

    delete cartItemObject.productId.__v;

    delete cartItemObject.createdAt;
    delete cartItemObject.updatedAt;

    return cartItemObject;
}

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
