import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// Route to create a new cart
router.post('/create-cart', cartController.createCart);


// Route to add an item to a cart
router.post('/cart/:cartId/add-item', async (req, res) => {
  const { cartId } = req.params;
  const { product, quantity, size } = req.body;

  try {
    if (!product || !quantity || !size) {
      return res.status(400).json({ message: 'Product ID, quantity, and size are required.' ,quantity,size,product });
    }

    await cartController.addItemToCart(cartId, product, quantity, size);
    res.status(200).json({ message: 'Item added to cart successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message});
  }
});

// Route to get cart with items
router.get('/cart/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await cartController.getCartWithItems(cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart with items', error: error.message });
  }
});

export default router;
