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

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;