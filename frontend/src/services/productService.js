import api from './api';

// Get all products with optional filters
export const getProducts = async (filters = {}) => {
  const params = typeof filters === 'string' ? { category: filters } : filters;
  const response = await api.get('/products', { params });
  return response.data.items || response.data.content || [];
};

// Get products by category
export const getProductsByCategory = async (category, filters = {}) => {
  const response = await api.get('/products', { params: { ...filters, category } });
  return response.data.items || response.data.content || [];
};

// Get single product by ID
export const getProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// Search products
export const searchProducts = async (searchTerm) => {
  const response = await api.get('/products', { params: { q: searchTerm } });
  return response.data.items || response.data.content || [];
};

// Get product stock information
export const getStock = async (_sku) => {
  return { data: { stock: 100 } };
};

// Get available filters
export const getFilters = async (category) => {
  const path = category ? `/products/filters/${category}` : '/products/filters';
  const response = await api.get(path);
  return response.data;
};

// Apply filters to products
export const applyFilters = (products, filters) => {
  return products.filter(product => {
    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }

    // Size filter
    if (filters.size && !product.sizes.includes(filters.size)) return false;

    // Color filter
    if (filters.color && !product.colors.includes(filters.color)) return false;

    // Stock filter
    if (filters.inStock && product.stock <= 0) return false;

    return true;
  });
};

// Sort products
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price_asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name_asc':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'stock_desc':
      sortedProducts.sort((a, b) => b.stock - a.stock);
      break;
    default:
      break;
  }

  return sortedProducts;
};