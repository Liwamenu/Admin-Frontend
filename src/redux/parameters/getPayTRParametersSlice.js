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

const getPayTRParametersSlice = createSlice({
  name: "getPayTRParameters",
  initialState,
  reducers: {
    resetGetPayTRParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetUpdatePayTRParametersState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayTRParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getPayTRParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getPayTRParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(updatePayTRParameters.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updatePayTRParameters.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.updateError = null;
        state.data = action.payload;
      })
      .addCase(updatePayTRParameters.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
      });
  },
});

export const getPayTRParameters = createAsyncThunk(
  "GeneralVariables/GetPayTRIntegrationParameters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${baseURL}GeneralVariables/GetPayTRIntegrationParameters`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  },
);

export const updatePayTRParameters = createAsyncThunk(
  "GeneralVariables/UpdatePayTRIntegrationParameters",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${baseURL}GeneralVariables/UpdatePayTRIntegrationParameters`,
        payload,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  },
);

export const { resetGetPayTRParametersState, resetUpdatePayTRParametersState } =
  getPayTRParametersSlice.actions;
export default getPayTRParametersSlice.reducer;
