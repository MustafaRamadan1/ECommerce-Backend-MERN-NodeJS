import CartItem from '../DB/models/cartItem.model';
import Cart from '../DB/models/cart.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import AppFeature from '../utils/appFeature';

const getTotalPrice = function (cartItem){

    let total = 0;
    cartItem.forEach((e)=> {

           
        total += ( e.productId.price * e.quantity);
    });

    return total;
}

const createCartItem = catchAsync(async (req, res, next)=>{

    const { productId, quantity} = req.body;
    const cartId = req.user.cart[0]._id;
    const newCartItem  = await CartItem.create({productId , cartId, quantity});
    console.log(newCartItem);

    if (!newCartItem) return next(new AppError('Error in creating cart item', 400));

    res.status(201).json({
        status: 'success',
        message: 'Cart item created successfully',
        data: newCartItem
    })
});


const getCartItemForUser = catchAsync(async (req, res, next)=>{
  
    const userCart = req.user.cart[0];
    // const userId = req.user._id;

    // const userCart = await Cart.findOne({userId});

    console.log();
    const appFeature = new AppFeature(CartItem.find({cartId: req.user.cart[0]._id}), req.query).pagination(3);

    // const userCartItems = await CartItem.find({cartId: userCart._id}).populate('productId');

    const userCartItems = await appFeature.query.populate({
        path: 'productId',
        select: '_id name price productImgs '
    }).select('-cartId ');

    let total = 0;

    total = getTotalPrice(userCartItems);

    userCart.total = total;
    await userCart.save();

    res.status(200).json({
        status: 'success',
        result: userCartItems.length,
        cartItems: userCartItems,
        cart: userCart
    });
    });

export default {createCartItem, getCartItemForUser}