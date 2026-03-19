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

const createPaymentLinkSlice = createSlice({
  name: "createPaymentLink",
  initialState: initialState,
  reducers: {
    resetCreatePaymentLink: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createPaymentLink.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(createPaymentLink.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(createPaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const createPaymentLink = createAsyncThunk(
  "PayTR/CreatePaymentLink",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`${baseURL}PayTR/CreatePaymentLink`, data, {
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

export const { resetCreatePaymentLink } = createPaymentLinkSlice.actions;
export default createPaymentLinkSlice.reducer;
