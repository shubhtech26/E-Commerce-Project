import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProductById);
router.put('/:id', productController.updateProductById);

export default router;


