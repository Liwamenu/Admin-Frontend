import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  summary: null,
};

const getAdminSummarySlice = createSlice({
  name: "getAdminSummary",
  initialState: initialState,
  reducers: {
    resetGetAdminSummaryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetAdminSummary: (state) => {
      state.summary = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAdminSummary.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getAdminSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.summary = action.payload;
      })
      .addCase(getAdminSummary.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.summary = null;
      });
  },
});

export const getAdminSummary = createAsyncThunk(
  "Statistics/getAdminSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Statistics/AdminSummary`);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetGetAdminSummaryState, resetGetAdminSummary } =
  getAdminSummarySlice.actions;
export default getAdminSummarySlice.reducer;
