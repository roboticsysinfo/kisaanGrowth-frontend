import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'; // import your api file for axios

// Thunks for fetching data
export const fetchShops = createAsyncThunk(
    'shop/fetchShops',
    async (params) => {
      const response = await fetch(`http://localhost:5000/api/shops?page=${params.page}&limit=${params.limit}`);
      const data = await response.json();
      return data.shops;  // Assuming 'shops' is the array in the response
    }
  );
  

export const fetchShopById = createAsyncThunk('shop/fetchShopById', async (id) => {
  const response = await api.get(`/shops/${id}`); // Adjust URL according to your API
  return response.data;
});

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    shop: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
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
        state.error = action.error.message;
      })
      .addCase(fetchShopById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shop = action.payload;
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default shopSlice.reducer;
