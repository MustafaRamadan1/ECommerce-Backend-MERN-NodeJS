import Stripe from "stripe";
import dotenv from "dotenv";
import Cart from "../DB/models/cart.model";
import CartItem from "../DB/models/cartItem.model";
import catchAsync from "../utils/catchAsync";
import {formatItemForPayment} from '../utils/helperFuncs';
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECERT_KEY);

const getCheckoutSession = catchAsync(async (req, res, next) => {
  const userCart = await Cart.findOne({ userId: req.user._id });

  const cartItems = await CartItem.find({ cartId: userCart._id }).populate(
    "productId"
  );


 
  const updatedCartItems = cartItems.map(formatItemForPayment);




  const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: updatedCartItems
  });


  res.status(200).json({
    status: 'success',
    sessionURL: session.url
  })
});

export default { getCheckoutSession };
