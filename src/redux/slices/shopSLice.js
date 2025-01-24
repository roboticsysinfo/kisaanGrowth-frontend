import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'; // import your api file for axios

// Thunks for fetching data
export const fetchShops = createAsyncThunk(
  'shop/fetchShops',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shops?page=${params.page}&limit=${params.limit}`);
      return response.data.shops; // Assuming 'shops' is the array in the response
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchShopById = createAsyncThunk(
  'shop/fetchShopById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shop/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Create shop
export const createShop = createAsyncThunk(
  'shop/createShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await api.post('/create-shop', shopData);
      return response.data; // Assuming the response contains the newly created shop
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Update shop
export const updateShop = createAsyncThunk(
  'shop/updateShop',
  async ({ id, shopData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/shop/${id}`, shopData);
      return response.data; // Returning updated shop data
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Delete shop
export const deleteShop = createAsyncThunk(
  'shop/deleteShop',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/shop/${id}`);
      return id; // Return shop ID to delete it from the state
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    shop: null,
    status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all shops
    builder
      .addCase(fetchShops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Handle errors from rejected action
      })
      // Fetch shop by ID
      .addCase(fetchShopById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shop = action.payload;
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Handle errors from rejected action
      })
      // Create shop
      .addCase(createShop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops.push(action.payload); // Add new shop to the list
      })
      .addCase(createShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update shop
      .addCase(updateShop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.shops.findIndex((shop) => shop._id === action.payload._id);
        if (index !== -1) {
          state.shops[index] = action.payload; // Update the shop in the list
        }
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete shop
      .addCase(deleteShop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = state.shops.filter((shop) => shop._id !== action.payload); // Remove deleted shop from the list
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
