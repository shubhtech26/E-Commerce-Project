import express from 'express';

 import getallItems from '../controllers/cartController.js';

const router = express.Router(); // Corrected from express.router() to express.Router()

// Get all items
router.get('/cart',getallItems );

export default router; // Export the router
