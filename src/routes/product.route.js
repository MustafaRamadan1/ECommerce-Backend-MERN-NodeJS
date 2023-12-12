import { Router } from 'express';

import { productController } from '../controllers/index'

import validation from '../middlewares/validation';
import  { productValidator }   from '../validation/index'

const router = Router();

router.post('/' , validation(productValidator.product),productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchOnProduct);

router.get('/:id', productController.getProductDetails);
router.patch('/:id' ,validation(productValidator.product), productController.updateProduct);
router.delete('/:id',validation(productValidator.product), productController.deleteProduct);

export default router;