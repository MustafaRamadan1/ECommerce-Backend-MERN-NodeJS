import CartItem from '../DB/models/cartItem.model';
import Cart from '../DB/models/cart.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';


const createCartItem = catchAsync(async (req, res, next)=>{

    const {cartId, productId} = req.body;

    const newCartItem  = await CartItem.create({productId , cartId});
    console.log(newCartItem);

    if (!newCartItem) return next(new AppError('Error in creating cart item', 400));

    res.status(201).json({
        status: 'success',
        message: 'Cart item created successfully',
        data: newCartItem
    })
});


const getCartItemForUser = catchAsync(async (req, res, next)=>{
  

    const userId = req.user._id;

    const userCart = await Cart.findOne({userId});
    console.log(userCart);

    const userCartItems = await CartItem.find({cartId: userCart._id}).populate('productId');

    res.status(200).json({
        status: 'success',
        result: userCartItems.length,
        cartItems: userCartItems
    });
    
})


export default {createCartItem, getCartItemForUser}