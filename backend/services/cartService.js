// services/cartService.js

import Cart from '../models/cart.model.js'; // Ensure the path is correct
import User from '../models/userModel.js'; // Ensure the path is correct

/**
 * Creates a cart for a specified user.
 * @param {string} userId - The ID of the user to associate the cart with.
 * @returns {Promise<import('mongoose').Document>} - The created cart.
 * @throws {Error} - If the user is not found or if there is an error creating the cart.
 */
const createCartForUser = async (userId) => {
  try {
    // Fetch the user by userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Create a new cart
    const cart = new Cart({
      user: user._id,  // Associate cart with the user
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

export default createCartForUser;
