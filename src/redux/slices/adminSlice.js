import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch all admins
export const fetchAdmins = createAsyncThunk("admins/fetchAdmins", async () => {
  const response = await api.get("/admin/users");
  return response.data.admins;
});

// Create a new admin
export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/register", adminData);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete an admin
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (adminId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/user/${adminId}`);
      return adminId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update an admin
export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async ({ adminId, adminData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/user/${adminId}`, adminData);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter((admin) => admin._id !== action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const updatedAdmin = action.payload;
        const index = state.admins.findIndex((admin) => admin._id === updatedAdmin._id);
        if (index !== -1) {
          state.admins[index] = updatedAdmin;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
