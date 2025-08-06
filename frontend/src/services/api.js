import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Handle specific error cases
    switch (error.response?.status) {
      case 401:
        // Unauthorized - redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        window.location.href = '/auth/login';
        break;
      case 403:
        toast.error('Access denied');
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;