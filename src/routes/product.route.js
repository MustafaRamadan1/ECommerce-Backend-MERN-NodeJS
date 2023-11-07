import { Router } from 'express';

import { productController } from '../controllers/index'

import validation from '../middlewares/validation';
import  validationSchema   from '../validation/index'
const { productValidator } = validationSchema

const router = Router();

router.post('/' , productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetails);
router.patch('/:id' , productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;