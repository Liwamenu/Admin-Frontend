import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const deletePaymentByIdSlice = createSlice({
  name: "deletePaymentById",
  initialState: initialState,
  reducers: {
    resetDeletePaymentById: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(deletePaymentById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(deletePaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(deletePaymentById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const deletePaymentById = createAsyncThunk(
  "Payments/deletePaymentById",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.delete(`${baseURL}Payments/deletePaymentById`, {
        params: data,
      });

      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetDeletePaymentById } = deletePaymentByIdSlice.actions;
export default deletePaymentByIdSlice.reducer;
