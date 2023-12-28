import userRoutes from './user.route';
import productRoutes from './product.route';
import categoryRoutes from './category.route';
import cartRoutes from '../routes/cart.route';
import inventoryRoutes from '../routes/inventory.route';
import ratingRoutes from '../routes/rating.route';
import paymentRoutes from '../routes/payment.route';
import { Router } from 'express';
import app from '../app';


const router = Router();



router.use('/api/v1/users',userRoutes);
router.use('/api/v1/products',productRoutes);
router.use('/api/v1/categories',categoryRoutes);
router.use('/api/v1/cart',cartRoutes);
router.use('/api/v1/inventories',inventoryRoutes);
router.use('/api/v1/rating', ratingRoutes);
router.use('/api/v1', paymentRoutes);



export default router;