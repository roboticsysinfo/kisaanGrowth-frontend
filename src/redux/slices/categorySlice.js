import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Define async thunks for API calls
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('/categories');
  return response.data;
});

export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (id) => {
  const response = await api.get(`/category/${id}`);
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (category) => {
  const response = await api.post('/category', category);
  return response.data.category;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, category }) => {
  const response = await api.put(`/category/${id}`, category);
  return response.data.category;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  await api.delete(`/category/${id}`);
  return id;
});

// Initial state
const initialState = {
  categories: [],
  category: null,
  status: 'idle',
  error: null,
};

// Create slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
