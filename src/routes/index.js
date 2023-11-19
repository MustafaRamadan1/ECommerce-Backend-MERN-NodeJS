import userRoutes from './user.route';
import productRoutes from './product.route';
import categoryRoutes from './category.route';
import cartRoutes from '../routes/cart.route';
import inventoryRoutes from '../routes/inventory.route';
import { Router } from 'express';


const router = Router();



router.use('/api/v1/users',userRoutes);
router.use('/api/v1/products',productRoutes);
router.use('/api/v1/categories',categoryRoutes);
router.use('/api/v1/cart',cartRoutes);
router.use('/api/v1/inventories',inventoryRoutes);



export default router;