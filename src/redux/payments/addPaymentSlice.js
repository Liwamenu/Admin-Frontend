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

const addPaymentSlice = createSlice({
  name: "addPayment",
  initialState: initialState,
  reducers: {
    resetAddPayment: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const addPayment = createAsyncThunk(
  "Payments/AddPayment",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(data || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await api.post(`${baseURL}Payments/AddPayment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

export const { resetAddPayment } = addPaymentSlice.actions;
export default addPaymentSlice.reducer;
