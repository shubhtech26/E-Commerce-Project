import Cart from '../models/cart.model.js' // Ensure the path and file extension are correct
import CartItem from '../models/cartItem.model.js'; // Corrected the import name
import Product from '../models/productModel.js'; // Ensure the path is correct
import User from '../models/userModel.js'; // Ensure the path is correct
import createCartForUser from '../services/cartService.js';
const createCart =async (req, res) => {
  const { userId } = req.body;  // Extract userId from request body

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const cart = await createCartForUser(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart', error: error.message });
  }
};

const addItemToCart = async (cartId, productId, quantity, size) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const cartItem = new CartItem({
      product: productId,
      cart: cartId,
      quantity: quantity,
      price: product.price,
      discountedPrice: product.discountedPrice,
      size: size
    });

    await cartItem.save();

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.cartItems.push(cartItem._id);
    await cart.save();

    console.log('Item added to cart:', cartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

const getCartWithItems = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate({
      path: 'cartItems',
      populate: { path: 'product' }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Calculate totalPrice, totalItem, and totalDiscountedPrice
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    cart.cartItems.forEach(item => {
      totalItem += item.quantity;
      totalPrice += item.price * item.quantity;
      totalDiscountedPrice += item.discountedPrice * item.quantity;
    });

    // Optionally, you can update the cart document with these values
    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;

    await cart.save(); // Save updated cart details with calculated values

    console.log('Cart details:', cart);
    return cart;
  } catch (error) {
    console.error('Error retrieving cart with items:', error);
    throw error;
  }
};




export default { createCart, addItemToCart , getCartWithItems };
