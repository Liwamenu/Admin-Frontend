import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const assignUserRolesSlice = createSlice({
  name: "assignUserRoles",
  initialState: initialState,
  reducers: {
    resetAssignUserRoles: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(assignUserRoles.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(assignUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(assignUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const assignUserRoles = createAsyncThunk(
  "Users/AssignUserRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${baseURL}Users/AssignUserRoles`,
        payload,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const { resetAssignUserRoles } = assignUserRolesSlice.actions;
export default assignUserRolesSlice.reducer;
