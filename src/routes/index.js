import userRoutes from './user.route';
import productRoutes from './product.route';
import categoryRoutes from './category.route';

import { Router } from 'express';


const router = Router();



router.use('/api/v1/users',userRoutes);
router.use('/api/v1/products',productRoutes);
router.use('/api/v1/categories',categoryRoutes);

export default router;