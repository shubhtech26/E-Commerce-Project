import Cart from '../models/cart.model.js' // Ensure the path and file extension are correct
import CartItem from '../models/cartItem.model.js'; // Corrected the import name
import Product from '../models/productModel.js'; // Ensure the path is correct
import User from '../models/userModel.js'; // Ensure the path is correct
import cartService from '../services/cartService.js';


const createCart =async (req, res) => {
  const { userId } = req.body;  // Extract userId from request body

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const cart = await cartService.createCartForUser(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart', error: error.message });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { productId } = req.params; // Extract productId from URL params
    const { userId } = req.body; // Extract userId from request body

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Call the service function to add the item to the cart
    const result = await cartService.addCartItemService(userId, productId);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// to be used in the order
















export default { createCart, addCartItem,findUserCart};
