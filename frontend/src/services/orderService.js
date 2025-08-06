import api from './api';

export const createOrder = async (orderData) => {
  return await api.post('/orders', orderData);
};

export const getOrders = async () => {
  return await api.get('/orders');
};

export const getOrderById = async (orderId) => {
  return await api.get(`/orders/${orderId}`);
};

export const updateOrderStatus = async (orderId, status) => {
  return await api.put(`/orders/${orderId}/status`, { status });
};

export const cancelOrder = async (orderId) => {
  return await api.put(`/orders/${orderId}/cancel`);
};

export const trackOrder = async (orderId) => {
  return await api.get(`/orders/${orderId}/track`);
};

export const getOrderHistory = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  
  return await api.get(`/orders/history?${params.toString()}`);
};

export const downloadInvoice = async (orderId) => {
  return await api.get(`/orders/${orderId}/invoice`, {
    responseType: 'blob',
  });
};

// Admin order management
export const getAllOrders = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  
  return await api.get(`/admin/orders?${params.toString()}`);
};

export const updateOrderStatusAdmin = async (orderId, status, tracking = {}) => {
  return await api.put(`/admin/orders/${orderId}/status`, { status, tracking });
};

export const getOrderStats = async () => {
  return await api.get('/admin/orders/stats');
};