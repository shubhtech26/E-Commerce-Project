import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// Route to create a new cart
router.post('/create-cart', cartController.createCart);

// Route to add an item to a cart
router.post('/add/:productId', cartController.addCartItem);





// Route to add an item to a cart
;

// Route to get cart with items
// router.get('/cart/:cartId', async (req, res) => {
//   const { cartId } = req.params;

//   try {
//     const cart = await cartController.getCartWithItems(cartId);
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving cart with items', error: error.message });
//   }
// });

export default router;
