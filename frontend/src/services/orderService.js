import api from './api';

export const getOrders = async (filters = {}) => {
  return await api.get('/orders', { params: filters });
};

export const getOrderById = async (orderId) => {
  return await api.get(`/orders/${orderId}`);
};

export const createOrder = async (orderData) => {
  return await api.post('/orders', orderData);
};

export const cancelOrder = async (orderId) => {
  return await api.delete(`/orders/${orderId}`);
};

export const updateOrderStatus = async (orderId, status) => {
  return await api.put(`/orders/${orderId}/status`, { status });
};

export const updateOrderAddress = async (orderId, address) => {
  return await api.put(`/orders/${orderId}/address`, address);
};