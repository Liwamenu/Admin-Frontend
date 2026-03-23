import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";
import toast from "react-hot-toast";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const deleteRoleSlice = createSlice({
  name: "deleteRole",
  initialState: initialState,
  reducers: {
    resetDeleteRole: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const deleteRole = createAsyncThunk(
  "Roles/DeleteRole",
  async (roleId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`${baseURL}Users/DeleteRole`, {
        params: { roleId },
      });
      return res?.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetDeleteRole } = deleteRoleSlice.actions;
export default deleteRoleSlice.reducer;
