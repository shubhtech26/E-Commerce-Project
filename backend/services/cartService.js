// services/cartService.js

import Cart from '../models/cart.model.js'; // Ensure the path is correct
import User from '../models/userModel.js'; // Ensure the path is correct
import Product from '../models/productModel.js';
import CartItem from '../models/cartItem.model.js';

const createCartForUser = async (userId) => {
  try {
    // Fetch the user by userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Create a new cart
    const cart = new Cart({
      user: user._id,  
      // Initialize other fields as needed
    });

    // Save the cart
    await cart.save();

    // Update the user with the cart reference
    user.cart = cart._id;
    await user.save();

    console.log('New cart created for user:', cart);
    return cart;
  } catch (error) {
    console.error('Error creating cart for user:', error);
    throw error;
  }
};


// Add an item to the user's cart
const addCartItemService = async (userId, productId) => {
  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if the item is already in the cart
    const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

    if (!isPresent) {
      // Create a new cart item if it does not exist
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1, // Default quantity
        userId,
        price: product.price,
        discountedPrice: product.discountedPrice
      });

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
    }

    return 'Item added to cart';
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw new Error('Failed to add item to cart');
  }
};


async function findUserCart(userId) {
  let cart =await Cart.findOne({ user: userId })
  
  let cartItems=await CartItem.find({cart:cart._id}).populate("product")

  cart.cartItems=cartItems
  

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (const cartItem of cart.cartItems) {
    totalPrice += cartItem.price;
    totalDiscountedPrice += cartItem.discountedPrice;
    totalItem += cartItem.quantity;
  }

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.discounte = totalPrice - totalDiscountedPrice;

  // const updatedCart = await cart.save();
  return cart;
}



export default { createCartForUser, addCartItemService, findUserCart};

