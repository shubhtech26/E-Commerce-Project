import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  addToCartLocal,
  removeFromCartLocal,
  updateCartItemLocal,
  clearCartLocal,
} from '../redux/slices/cartSlice';
import { useAuth } from './useAuth';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth();

  const handleFetchCart = useCallback(() => {
    if (isAuthenticated) {
      return dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleAddToCart = useCallback((product, quantity = 1, size, color) => {
    if (isAuthenticated) {
      return dispatch(addToCart({
        productId: product._id,
        quantity,
        size,
        color,
      }));
    } else {
      // For guest users, use local cart
      return dispatch(addToCartLocal({
        product,
        quantity,
        size,
        color,
      }));
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateCartItem = useCallback((itemId, quantity) => {
    if (isAuthenticated) {
      return dispatch(updateCartItem({ cartItemId: itemId, quantity }));
    } else {
      return dispatch(updateCartItemLocal({ itemId, quantity }));
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromCart = useCallback((itemId) => {
    if (isAuthenticated) {
      return dispatch(removeFromCart(itemId));
    } else {
      return dispatch(removeFromCartLocal(itemId));
    }
  }, [dispatch, isAuthenticated]);

  const handleClearCart = useCallback(() => {
    if (isAuthenticated) {
      return dispatch(clearCart());
    } else {
      return dispatch(clearCartLocal());
    }
  }, [dispatch, isAuthenticated]);

  const getCartItemsCount = useCallback(() => {
    return cart.totalItems;
  }, [cart.totalItems]);

  const getCartTotal = useCallback(() => {
    return cart.totalPrice;
  }, [cart.totalPrice]);

  const isInCart = useCallback((productId, size, color) => {
    return cart.items.some(item => 
      item.product._id === productId && 
      item.size === size && 
      item.color === color
    );
  }, [cart.items]);

  return {
    items: cart.items,
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    loading: cart.loading,
    error: cart.error,
    fetchCart: handleFetchCart,
    addToCart: handleAddToCart,
    updateCartItem: handleUpdateCartItem,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    getCartItemsCount,
    getCartTotal,
    isInCart,
  };
};