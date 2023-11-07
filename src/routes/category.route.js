import { Router } from 'express';

import { categoryController } from '../controllers/index'

import validation from '../middlewares/validation';
import  validationSchema   from '../validation/index'
const { categoryValidator } = validationSchema

const router = Router();

router.post('/' , categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryDetails);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;