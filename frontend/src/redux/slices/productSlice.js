import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../services/productService';

// Async thunks for products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const items = await productService.getProducts(filters);
      return { products: items };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const product = await productService.getProductById(productId);
      return product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async ({ category, filters = {} }, { rejectWithValue }) => {
    try {
      const items = await productService.getProductsByCategory(category, filters);
      return { products: items };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const items = await productService.searchProducts(searchTerm);
      return { products: items };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    currentProduct: null,
    searchResults: [],
    categories: [],
    loading: false,
    error: null,
    filters: {
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'name',
      sortOrder: 'asc',
    },
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        rating: 0,
        sortBy: 'name',
        sortOrder: 'asc',
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Products By Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.products || action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  setFilters, 
  clearFilters, 
  setPagination, 
  clearSearchResults 
} = productSlice.actions;

export default productSlice.reducer;