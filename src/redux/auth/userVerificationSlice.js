//userVerificationSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const userVerificationSlice = createSlice({
  name: "userVerification",
  initialState: initialState,
  reducers: {
    resetSendVerification: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendVerificationCode.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.sessionId = null;
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const sendVerificationCode = createAsyncThunk(
  "Auth/verifyUser",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Email/SendEmailUserVerify`, {
        params: {
          email,
        },
      });

      let data;
      if (res.data?.data?.token) {
        const {
          data: { token },
          ...rest
        } = res.data;
        data = { token, ...rest };
      } else {
        data = res.data;
      }
      const KEY = import.meta.env.VITE_LOCAL_KEY;
      localStorage.setItem(`${KEY}`, JSON.stringify(data));
      // console.log(res.data);
      return data;
    } catch (err) {
      const errorMessage = err.response.data.message_TR || err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetSendVerification } = userVerificationSlice.actions;
export default userVerificationSlice.reducer;
