// alertsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    success: {
      open: false,
      message: ''
    },
    error: {
      open: false,
      message: ''
    },
    info: {
      open: false,
      message: ''
    }
  },
  reducers: {
    setSuccessAlert: (state, action) => {
      console.log('Action', action);
      state.success = { open: true, message: action.payload };
      state.error = { open: false, message: '' };
      state.info = { open: false, message: '' };
    },
    setErrorAlert: (state, action) => {
      console.log("Action", action);
      state.success = { open: false, message: '' };
      state.error = { open: true, message: action.payload };
      state.info = { open: false, message: '' };
    },
    setInfoAlert: (state, action) => {
      state.success = { open: false, message: '' };
      state.error = { open: false, message: '' };
      state.info = { open: true, message: action.payload };
    },
    closeAlert: (state) => {
      state.success = { open: false, message: '' };
      state.error = { open: false, message: '' };
      state.info = { open: false, message: '' };
    },
  },
});

export const { setSuccessAlert, setErrorAlert, setInfoAlert, closeAlert } = alertsSlice.actions;

export const selectSuccessAlerts = (state) => state.alertsSlice.success;
export const selectErrorAlerts = (state) => state.alertsSlice.error;
export const selectInfoAlerts = (state) => state.alertsSlice.info;
export const selectAlerts = (state) => state.alertsSlice.alerts;

export default alertsSlice.reducer;
