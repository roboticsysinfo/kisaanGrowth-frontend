import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit, search, filter }) => {
    const response = await api.get("/products", {
      params: { page, limit, search, filter },
    });
    return response.data;
  }
);

// Async thunk for adding a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post("/create-product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.warn("Product:", response)
      return response.data.product; // Return the newly added product
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to add product");
    }
  }
);

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await api.get("/categories");
    return response.data.categories;
  }
);

// Async thunk for fetching subcategories based on category
export const fetchSubCategories = createAsyncThunk(
  "products/fetchSubCategories",
  async (categoryId) => {
    const response = await api.get(`/sub-categories/${categoryId}`);
    return response.data.subcategories;
  }
);

const productslice = createSlice({
  name: "products",
  initialState: {
    data: [],
    totalPages: 0,
    currentPage: 1,
    status: "idle",
    error: null,
    addProductStatus: "idle",
    addProductError: null,
    categories: [],
    subCategories: [],
    fetchCategoriesStatus: "idle",
    fetchSubCategoriesStatus: "idle",
  },
  reducers: {
    resetAddProductState: (state) => {
      state.addProductStatus = "idle";
      state.addProductError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Add product
    builder
      .addCase(addProduct.pending, (state) => {
        state.addProductStatus = "loading";
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = "succeeded";
        state.data.push(action.payload); // Add the new product to the list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = "failed";
        state.addProductError = action.payload;
      });

    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchCategoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.fetchCategoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.fetchCategoriesStatus = "failed";
        state.error = action.error.message;
      });

    // Fetch subcategories
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.fetchSubCategoriesStatus = "loading";
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.fetchSubCategoriesStatus = "succeeded";
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.fetchSubCategoriesStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetAddProductState } = productslice.actions;

export default productslice.reducer;
