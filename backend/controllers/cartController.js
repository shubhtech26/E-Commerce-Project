import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
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
    const { userId, productId, quantity = 1, size } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });
    await cartService.createCartForUser(userId);
    await cartService.addCartItemService(userId, productId);
    const cart = await cartService.findUserCart(userId);
    return res.json({ items: cart.cartItems, totalItems: cart.totalItem, totalPrice: cart.totalPrice });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// to be used in the order
















export default { createCart, addCartItem, findUserCart: cartService.findUserCart };
