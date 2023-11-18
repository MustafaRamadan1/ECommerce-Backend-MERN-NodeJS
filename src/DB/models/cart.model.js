import mongoose from 'mongoose';
import User from './user.model';
const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Cart must belong to a user'],
        unique: true
    },
    total: {
        type: Number,
        default: 0
    }
}, 
{
    timestamps: true
});


cartSchema.methods.toJSON = function(){
    const cart = this;

    const cartObject = this.toObject();

    delete cartObject.__v;

    return cartObject;
}

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;