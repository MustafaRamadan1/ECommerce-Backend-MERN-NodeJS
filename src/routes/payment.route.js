import express from 'express';
import paymentController from '../controllers/payment.controller';
import protect from '../middlewares/auth.middleware';
const router = express.Router();


router.get('/checkout-Session', protect, paymentController.getCheckoutSession);



export default router;