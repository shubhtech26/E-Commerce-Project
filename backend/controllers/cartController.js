import Cart from '../models/cart.model.js' // Ensure the path and file extension are correct
import CartItem from '../models/cartItem.model.js'; // Corrected the import name
import Product from '../models/productModel.js'; // Ensure the path is correct

const createCart = async () => {
  try {
    const cart = new Cart();
    await cart.save();
    console.log('New cart created:', cart);
    return cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;  // Rethrow the error if needed
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

    console.log('Cart details:', cart);
    return cart;
  } catch (error) {
    console.error('Error retrieving cart with items:', error);
    throw error;
  }
};


export default { createCart, addItemToCart , getCartWithItems };
