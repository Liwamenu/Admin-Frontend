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

const sendSMSPaymentLinkSlice = createSlice({
  name: "sendSMSPaymentLink",
  initialState: initialState,
  reducers: {
    resetSendSMSPaymentLink: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendSMSPaymentLink.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(sendSMSPaymentLink.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(sendSMSPaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const sendSMSPaymentLink = createAsyncThunk(
  "SMS/SendSMSPayTRPaymentLink",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}SMS/SendSMSPayTRPaymentLink`, {
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

export const { resetSendSMSPaymentLink } = sendSMSPaymentLinkSlice.actions;
export default sendSMSPaymentLinkSlice.reducer;
