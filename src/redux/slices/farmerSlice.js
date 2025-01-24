// redux/farmersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchFarmers = createAsyncThunk('farmers/fetchFarmers', async () => {
  try {
    const response = await api.get('/farmers');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const farmersSlice = createSlice({
  name: 'farmers',
  initialState: {
    farmers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarmers.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = action.payload;
      })
      .addCase(fetchFarmers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default farmersSlice.reducer;
