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
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      const price = product.discountedPrice ?? product.price;
      if (price < min || price > max) return false;
    }

    if (filters.size && filters.size.length) {
      const sizeNames = Array.isArray(product.sizes) ? product.sizes.map(s => s.name) : [];
      if (!filters.size.some(s => sizeNames.includes(s))) return false;
    }

    if (filters.color) {
      if ((product.color || '').toLowerCase() !== String(filters.color).toLowerCase()) return false;
    }

    if (filters.brand) {
      if (Array.isArray(filters.brand) && filters.brand.length > 0) {
        if (!filters.brand.map(b => String(b).toLowerCase()).includes(String(product.brand || '').toLowerCase())) return false;
      } else if (typeof filters.brand === 'string') {
        if (String(product.brand || '').toLowerCase() !== String(filters.brand).toLowerCase()) return false;
      }
    }

    if (filters.discount) {
      const original = product.price ?? 0;
      const sale = product.discountedPrice ?? original;
      const percent = original > 0 ? Math.round(((original - sale) / original) * 100) : 0;
      if (percent < Number(filters.discount)) return false;
    }

    if (filters.inStock) {
      if ((product.quantity ?? 0) <= 0) return false;
    }

    return true;
  });
};

// Sort products
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price_asc':
      sortedProducts.sort((a, b) => (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price));
      break;
    case 'price_desc':
      sortedProducts.sort((a, b) => (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price));
      break;
    case 'stock_desc':
      sortedProducts.sort((a, b) => b.stock - a.stock);
      break;
    default:
      break;
  }

  return sortedProducts;
};