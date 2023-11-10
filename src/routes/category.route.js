import { Router } from 'express';

import { categoryController } from '../controllers/index'

import validation from '../middlewares/validation';
import  { categoryValidator }   from '../validation/index'

const router = Router();

router.post('/' , validation(categoryValidator.category),categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryDetails);
router.patch('/:id', validation(categoryValidator.category),categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;