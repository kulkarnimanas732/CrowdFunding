import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { setErrorAlert } from '../../Utility/Slice/alertsSlice';

export const loginUser = createAsyncThunk(
  'loginSlice/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      const url = "http://localhost:5000/api/auth/login";
      const response = await axios.post(url, {
        email: username,
        password: password
      });
      if (response.status === 200) {
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('access_token', response.data.token);
        return response;
      }
      else {
        thunkAPI.dispatch(setErrorAlert('Login failed. Please check your credentials.'));
        return thunkAPI.rejectWithValue("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if(error.response.status === 403){
        thunkAPI.dispatch(setErrorAlert('Invalid Email or Password credential.'));
      }
      return thunkAPI.rejectWithValue(error.message || 'Internal Server Error');
    }
  }
);

export const logout = async (dispatch) => {
  localStorage.removeItem('role');
  localStorage.removeItem('token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('userId');
  dispatch(logoutSuccess());
}

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    role: null,
    username: null,
    loading: false,
    userId:null,
    isAuthenticated: false
  },
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.role = action.role
      // state.userId=action.userId
      state.loading = false
      state.isAuthenticated = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const { logoutSuccess } = loginSlice.actions;

export const isAuthenticated = (state) => state.loginSlice.isAuthenticated;
export const isLoading = (state) => state.loginSlice.loading;
export default loginSlice.reducer