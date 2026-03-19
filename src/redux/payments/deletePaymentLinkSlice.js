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

const deletePaymentLinkSlice = createSlice({
  name: "deletePaymentLink",
  initialState: initialState,
  reducers: {
    resetDeletePaymentLink: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(deletePaymentLink.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(deletePaymentLink.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(deletePaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const deletePaymentLink = createAsyncThunk(
  "PayTR/DeletePaymentLink",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`${baseURL}PayTR/DeletePaymentLink`, data);

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

export const { resetDeletePaymentLink } = deletePaymentLinkSlice.actions;
export default deletePaymentLinkSlice.reducer;
