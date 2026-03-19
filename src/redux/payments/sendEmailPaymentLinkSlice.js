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

const sendEmailPaymentLinkSlice = createSlice({
  name: "sendEmailPaymentLink",
  initialState: initialState,
  reducers: {
    resetSendEmailPaymentLink: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendEmailPaymentLink.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(sendEmailPaymentLink.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(sendEmailPaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const sendEmailPaymentLink = createAsyncThunk(
  "Email/SendEmailPayTRPaymentLink",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Email/SendEmailPayTRPaymentLink`, {
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

export const { resetSendEmailPaymentLink } = sendEmailPaymentLinkSlice.actions;
export default sendEmailPaymentLinkSlice.reducer;
