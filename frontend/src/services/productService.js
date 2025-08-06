import api from './api';
import { mockProducts, mockCategories } from '../data/mockData';

// Use mock data for development
const USE_MOCK_DATA = true;

export const getProducts = async (filters = {}) => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    if (filters.subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === filters.subcategory);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= parseFloat(filters.rating));
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating_desc':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'name_asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }
    
    // Apply pagination
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit)
        }
      }
    };
  }
  
  const params = new URLSearchParams();
  
  // Add filters to query params
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      if (Array.isArray(filters[key])) {
        params.append(key, filters[key].join(','));
      } else {
        params.append(key, filters[key]);
      }
    }
  });
  
  return await api.get(`/products?${params.toString()}`);
};

export const getProductById = async (productId) => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p._id === productId);
    if (product) {
      return { data: product };
    } else {
      throw new Error('Product not found');
    }
  }
  
  return await api.get(`/products/${productId}`);
};

export const getProductsByCategory = async (category, filters = {}) => {
  const params = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== '') {
      if (Array.isArray(filters[key])) {
        params.append(key, filters[key].join(','));
      } else {
        params.append(key, filters[key]);
      }
    }
  });
  
  return await api.get(`/products/category/${category}?${params.toString()}`);
};

export const searchProducts = async (searchTerm) => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const filteredProducts = mockProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return { data: { products: filteredProducts } };
  }
  
  return await api.get(`/products/search?q=${encodeURIComponent(searchTerm)}`);
};

export const getCategories = async () => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { data: mockCategories };
  }
  
  return await api.get('/products/categories');
};

export const getFeaturedProducts = async () => {
  return await api.get('/products/featured');
};

export const getNewArrivals = async () => {
  return await api.get('/products/new-arrivals');
};

export const getBestSellers = async () => {
  return await api.get('/products/best-sellers');
};

export const getRelatedProducts = async (productId) => {
  return await api.get(`/products/${productId}/related`);
};

// Product Reviews
export const getProductReviews = async (productId) => {
  return await api.get(`/products/${productId}/reviews`);
};

export const addProductReview = async (productId, reviewData) => {
  return await api.post(`/products/${productId}/reviews`, reviewData);
};

export const updateProductReview = async (productId, reviewId, reviewData) => {
  return await api.put(`/products/${productId}/reviews/${reviewId}`, reviewData);
};

export const deleteProductReview = async (productId, reviewId) => {
  return await api.delete(`/products/${productId}/reviews/${reviewId}`);
};

// Admin product management
export const createProduct = async (productData) => {
  return await api.post('/admin/products', productData);
};

export const updateProduct = async (productId, productData) => {
  return await api.put(`/admin/products/${productId}`, productData);
};

export const deleteProduct = async (productId) => {
  return await api.delete(`/admin/products/${productId}`);
};

export const uploadProductImages = async (productId, images) => {
  const formData = new FormData();
  images.forEach(image => {
    formData.append('images', image);
  });
  
  return await api.post(`/admin/products/${productId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};