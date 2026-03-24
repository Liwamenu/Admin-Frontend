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

const getSMSParametersSlice = createSlice({
  name: "getSMSParameters",
  initialState,
  reducers: {
    resetGetSMSParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetUpdateSMSParametersState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSMSParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getSMSParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getSMSParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(updateSMSParameters.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updateSMSParameters.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.updateError = null;
        state.data = action.payload;
      })
      .addCase(updateSMSParameters.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
      });
  },
});

export const getSMSParameters = createAsyncThunk(
  "GeneralVariables/GetSMSParameters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${baseURL}GeneralVariables/GetSMSParameters`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  },
);

export const updateSMSParameters = createAsyncThunk(
  "GeneralVariables/UpdateSMSParameters",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${baseURL}GeneralVariables/UpdateSMSParameters`,
        payload,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  },
);

export const { resetGetSMSParametersState, resetUpdateSMSParametersState } =
  getSMSParametersSlice.actions;
export default getSMSParametersSlice.reducer;
