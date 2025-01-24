// subCategorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Fetch all subcategories
export const fetchSubCategories = createAsyncThunk('subCategories/fetchSubCategories', async (categoryId) => {
  const response = await api.get(`/sub-categories?category=${categoryId}`);
  return response.data;
});

// Slice for subcategory management
const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState: {
    subCategories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subCategorySlice.reducer;
