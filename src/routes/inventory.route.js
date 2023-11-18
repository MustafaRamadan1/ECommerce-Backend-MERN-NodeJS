import { Router } from 'express';

import { inventoryController } from '../controllers/index'

import validation from '../middlewares/validation';
import  { inventoryValidator }   from '../validation/index'

const router = Router();

router.post('/' , validation(inventoryValidator.inventory),inventoryController.createInventory);
router.get('/', inventoryController.getAllInventory);
router.get('/:id', validation(inventoryValidator.inventory),inventoryController.getInventoryDetails);
router.patch('/:id' ,validation(inventoryValidator.inventory), inventoryController.updateInventoryStockQuantity);
router.delete('/:id',validation(inventoryValidator.inventory), inventoryController.deleteInventory);

export default router;