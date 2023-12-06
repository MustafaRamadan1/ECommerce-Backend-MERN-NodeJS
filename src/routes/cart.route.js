import express from 'express';
import protect from '../middlewares/auth.middleware';
import CartController from '../controllers/cartItem.controller'
import validation from '../middlewares/validation';
import cartValidation from '../validation/cart.validation';
const router = express.Router();

router.post('/', validation(cartValidation.createCart),  protect, CartController.createCartItem );
router.get('/', protect, CartController.getCartItemForUser);
router.delete('/:id', validation(cartValidation.deleteCartItem),protect, CartController.deleteCartItem);
router.patch('/:id', validation(cartValidation.updateCartItem), CartController.updateCartItem)
export default router;