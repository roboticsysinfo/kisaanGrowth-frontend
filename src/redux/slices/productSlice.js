import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


// Define async thunks for API calls
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  try {
    const response = await api.get('/products'); // Assuming api is an axios instance
    return response.data; // Directly return data from the response
  } catch (error) {
    // Handle errors here, you can throw a custom error if needed
    throw new Error('Failed to fetch products');
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle', // Could be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products; // Ensure you are accessing the "products" key from the API response
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message
      });
  },
});


export default productSlice.reducer;
