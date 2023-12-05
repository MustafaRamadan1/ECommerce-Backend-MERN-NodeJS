import express from 'express';
import protect from '../middlewares/auth.middleware';
import CartController from '../controllers/cartItem.controller'
const router = express.Router();

router.post('/', protect, CartController.createCartItem );
router.get('/', protect, CartController.getCartItemForUser);
router.delete('/:id', protect, CartController.deleteCartItem);
router.patch('/:id', CartController.updateCartItem)
export default router;