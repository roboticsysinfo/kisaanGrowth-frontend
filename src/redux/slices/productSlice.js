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
            return response.data.product; // Return the newly added product
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to add product");
        }
    }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/products/${id}`, updatedData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.product; // Return the updated product
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to update product");
        }
    }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/products/${id}`);
            return id; // Return the ID of the deleted product
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to delete product");
        }
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
        updateProductStatus: "idle",
        updateProductError: null,
        deleteProductStatus: "idle", // Corrected state initialization
        deleteProductError: null, // Added error field for delete product
    },
    reducers: {
        resetaddProductstate: (state) => {
            state.addProductStatus = "idle";
            state.addProductError = null;
        },
        resetupdateProductstate: (state) => {
            state.updateProductStatus = "idle";
            state.updateProductError = null;
        },
        resetdeleteProductstate: (state) => {
            state.deleteProductStatus = "idle";
            state.deleteProductError = null;
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

        // Update product
        builder
            .addCase(updateProduct.pending, (state) => {
                state.updateProductStatus = "loading";
                state.updateProductError = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateProductStatus = "succeeded";
                const index = state.data.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.data[index] = action.payload; // Update the product in the list
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateProductStatus = "failed";
                state.updateProductError = action.payload;
            });

        // Delete product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.deleteProductStatus = "loading";  // Corrected to "loading"
                state.deleteProductError = null;  // Reset error state
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteProductStatus = "succeeded";
                state.data = state.data.filter((product) => product._id !== action.payload); // Remove the product from the list
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteProductStatus = "failed";
                state.deleteProductError = action.payload;  // Corrected to track error separately
            });
    },
});

export const {
    resetaddProductstate,
    resetupdateProductstate,
    resetdeleteProductstate,
} = productslice.actions;

export default productslice.reducer;
