import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
};

const getEmailParametersSlice = createSlice({
  name: "getEmailParameters",
  initialState,
  reducers: {
    resetGetEmailParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetUpdateEmailParametersState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmailParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getEmailParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getEmailParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(updateEmailParameters.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updateEmailParameters.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.updateError = null;
        state.data = action.payload;
      })
      .addCase(updateEmailParameters.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
      });
  },
});

export const getEmailParameters = createAsyncThunk(
  "GeneralVariables/GetEmailParameters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${baseURL}GeneralVariables/GetEmailParameters`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  },
);

export const updateEmailParameters = createAsyncThunk(
  "GeneralVariables/UpdateEmailParameters",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${baseURL}GeneralVariables/UpdateEmailParameters`,
        payload,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  },
);

export const { resetGetEmailParametersState, resetUpdateEmailParametersState } =
  getEmailParametersSlice.actions;
export default getEmailParametersSlice.reducer;
