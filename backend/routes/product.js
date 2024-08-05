import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProductById);
router.put('/:id', productController.updateProductById);

router.get('/getall', productController.getAllProducts);
router.get('/id/:id', productController.findProductById);
router.get('/search', productController.searchProduct);

export default router;


