import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '../../services/cartService';

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1, size, color }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart({ productId, quantity, size, color });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(cartItemId, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartItemId, { rejectWithValue }) => {
    try {
      await cartService.removeFromCart(cartItemId);
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Local cart operations (for guest users)
    addToCartLocal: (state, action) => {
      const { product, quantity = 1, size, color } = action.payload;
      const existingItem = state.items.find(
        item => 
          item.product._id === product._id && 
          item.size === size && 
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          _id: Date.now().toString(),
          product,
          quantity,
          size,
          color,
          price: product.price,
        });
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    removeFromCartLocal: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    updateCartItemLocal: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item._id === itemId);
      
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter(item => item._id !== itemId);
        }
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    clearCartLocal: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.payload;
        state.items = state.items.filter(item => item._id !== itemId);
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce(
          (total, item) => total + (item.price * item.quantity), 
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  addToCartLocal, 
  removeFromCartLocal, 
  updateCartItemLocal, 
  clearCartLocal 
} = cartSlice.actions;

export default cartSlice.reducer;