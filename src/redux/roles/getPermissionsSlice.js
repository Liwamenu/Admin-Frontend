import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  permissions: null,
};

const getPermissionsSlice = createSlice({
  name: "getPermissions",
  initialState: initialState,
  reducers: {
    resetGetPermissions: (state) => {
      state.permissions = null;
    },
    resetGetPermissionsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getPermissions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.permissions = null;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.permissions = null;
      });
  },
});

export const getPermissions = createAsyncThunk(
  "Roles/GetPermissions",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Users/GetPermissions`, {
        params,
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

export const { resetGetPermissions, resetGetPermissionsState } =
  getPermissionsSlice.actions;
export default getPermissionsSlice.reducer;
