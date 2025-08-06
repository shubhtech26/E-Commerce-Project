// API URLs
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// App Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  PROFILE: '/profile',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: '/order/:id',
  WISHLIST: '/wishlist',
  SEARCH: '/search',
  CATEGORY: '/category/:category',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CUSTOMERS: '/admin/customers',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
};

export const ORDER_STATUS_COLORS = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  SHIPPED: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
  RETURNED: 'secondary',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
};

// Product Categories
export const CATEGORIES = {
  MEN: 'men',
  WOMEN: 'women',
  KIDS: 'kids',
  ACCESSORIES: 'accessories',
  SHOES: 'shoes',
  ELECTRONICS: 'electronics',
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Rating: High to Low' },
  { value: 'created_desc', label: 'Newest First' },
  { value: 'created_asc', label: 'Oldest First' },
];

// Filter Price Ranges
export const PRICE_RANGES = [
  { value: '0-50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200-500', label: '$200 - $500' },
  { value: '500-1000', label: '$500 - $1000' },
  { value: '1000+', label: '$1000+' },
];

// Rating Filters
export const RATING_FILTERS = [
  { value: 4, label: '4★ & above' },
  { value: 3, label: '3★ & above' },
  { value: 2, label: '2★ & above' },
  { value: 1, label: '1★ & above' },
];

// Sizes
export const SIZES = {
  CLOTHING: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  SHOES: ['6', '7', '8', '9', '10', '11', '12'],
  ACCESSORIES: ['One Size'],
};

// Colors
export const COLORS = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Gray', code: '#9CA3AF' },
  { name: 'Red', code: '#EF4444' },
  { name: 'Blue', code: '#3B82F6' },
  { name: 'Green', code: '#10B981' },
  { name: 'Yellow', code: '#F59E0B' },
  { name: 'Purple', code: '#8B5CF6' },
  { name: 'Pink', code: '#EC4899' },
  { name: 'Brown', code: '#92400E' },
];

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  RECENT_SEARCHES: 'recent_searches',
  THEME: 'theme',
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  REGISTER_SUCCESS: 'Account created successfully!',
  PRODUCT_ADDED_TO_CART: 'Product added to cart!',
  PRODUCT_REMOVED_FROM_CART: 'Product removed from cart!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  PHONE_LENGTH: 10,
  PINCODE_LENGTH: 6,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES: 5,
};

// Social Login Providers
export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
};