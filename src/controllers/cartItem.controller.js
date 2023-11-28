import CartItem from "../DB/models/cartItem.model";
import Cart from "../DB/models/cart.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppFeature from "../utils/appFeature";

const getTotalPrice = function (cartItem) {
  let total = 0;
  cartItem.forEach((e) => {
    total += e.productId.price * e.quantity;
  });

  return total;
};

const createCartItem = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({userId: req.user._id});

  const cartId = cart._id;
  const newCartItem = await CartItem.create({ productId, cartId, quantity, userId:req.user._id });

  if (!newCartItem)
    return next(new AppError("Error in creating cart item", 400));

  res.status(201).json({
    status: "success",
    message: "Cart item created successfully",
    data: newCartItem,
  });
});

const getCartItemForUser = catchAsync(async (req, res, next) => {
 
  const cart = await Cart.findOne({userId: req.user._id});
  const appFeature = new AppFeature(
    CartItem.find({ userId: req.user._id }),
    req.query
  ).pagination(3);

  const userCartItems = await appFeature.query
    .populate({
      path: "productId",
      select: "_id name price productImgs ",
    })
    .select("-cartId ");

  let total = 0;

  total = getTotalPrice(userCartItems);

  cart.total = total;
  await cart.save();

  res.status(200).json({
    status: "success",
    result: userCartItems.length,
    cartItems: userCartItems,
    cart,
  });
});

export default { createCartItem, getCartItemForUser };
