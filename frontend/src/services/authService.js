import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Even if API call fails, clear local storage
    console.warn('Logout API call failed:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = async () => {
  return await api.get('/auth/me');
};

export const updateProfile = async (userData) => {
  return await api.put('/auth/profile', userData);
};

export const changePassword = async (passwordData) => {
  return await api.put('/auth/change-password', passwordData);
};

export const forgotPassword = async (email) => {
  return await api.post('/auth/forgot-password', { email });
};

export const resetPassword = async (token, newPassword) => {
  return await api.post('/auth/reset-password', { token, newPassword });
};

export const verifyEmail = async (token) => {
  return await api.post('/auth/verify-email', { token });
};