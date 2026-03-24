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

const createFreeLicensePaymentSlice = createSlice({
  name: "createFreeLicensePayment",
  initialState: initialState,
  reducers: {
    resetCreateFreeLicensePayment: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createFreeLicensePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFreeLicensePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createFreeLicensePayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const createFreeLicensePayment = createAsyncThunk(
  "Payments/CreateFreeLicensePayment",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}Payments/CreateFreeLicensePayment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(res);
      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetCreateFreeLicensePayment } =
  createFreeLicensePaymentSlice.actions;
export default createFreeLicensePaymentSlice.reducer;
