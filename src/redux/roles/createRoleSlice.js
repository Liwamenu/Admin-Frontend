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

const createRoleSlice = createSlice({
  name: "createRole",
  initialState: initialState,
  reducers: {
    resetCreateRole: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const createRole = createAsyncThunk(
  "Roles/CreateRole",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`${baseURL}Users/CreateRole`, data);
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

export const { resetCreateRole } = createRoleSlice.actions;
export default createRoleSlice.reducer;
