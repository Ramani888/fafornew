import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const walletConversion = createAsyncThunk(
  'walletConversion',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.walletConversion,
        requestData,
      );
      const responseData = await response.data;
      if (responseData?.response == 200) {
        return responseData;
      } else {
        return rejectWithValue(responseData?.msg);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.msg);
    }
  },
);

export const walletConversionClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const walletConversionSlice = createSlice({
  name: 'walletConversionSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(walletConversion.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(walletConversion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(walletConversion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(walletConversionClear, () => initialState);
  },
});

export default walletConversionSlice.reducer;
