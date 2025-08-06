import api from './api';

export const getCart = async () => {
  return await api.get('/cart');
};

export const addToCart = async (cartItem) => {
  return await api.post('/cart/add', cartItem);
};

export const updateCartItem = async (cartItemId, updateData) => {
  return await api.put(`/cart/items/${cartItemId}`, updateData);
};

export const removeFromCart = async (cartItemId) => {
  return await api.delete(`/cart/items/${cartItemId}`);
};

export const clearCart = async () => {
  return await api.delete('/cart/clear');
};

export const getCartItemsCount = async () => {
  return await api.get('/cart/count');
};

export const moveToWishlist = async (cartItemId) => {
  return await api.post(`/cart/items/${cartItemId}/move-to-wishlist`);
};

export const applyCoupon = async (couponCode) => {
  return await api.post('/cart/apply-coupon', { couponCode });
};

export const removeCoupon = async () => {
  return await api.delete('/cart/remove-coupon');
};