import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Cart must belong to a user'],
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