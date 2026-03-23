import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  roles: null,
};

const getRolesSlice = createSlice({
  name: "getRoles",
  initialState: initialState,
  reducers: {
    resetGetRoles: (state) => {
      state.roles = null;
    },
    resetGetRolesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.roles = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.roles = null;
      });
  },
});

export const getRoles = createAsyncThunk(
  "Roles/GetRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Users/GetRoles`);
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

export const { resetGetRoles, resetGetRolesState } = getRolesSlice.actions;
export default getRolesSlice.reducer;
