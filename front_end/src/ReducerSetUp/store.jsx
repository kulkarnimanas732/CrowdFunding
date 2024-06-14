import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// Import your reducers
import counterReducer from './counterSlice';
import loginReducer from '../Login/slice/LoginSlice';
import dashboardReducer from '../Dashboard/Slice/DashboardSlice';
import alertsSlice from '../Utility/Slice/alertsSlice';

// Combine reducers if you have multiple
const rootReducer = combineReducers({
  counter: counterReducer,
  loginSlice: loginReducer,
  dashboardSlice: dashboardReducer,
  alertsSlice: alertsSlice
});

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap your root reducer with persistReducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export the Redux store
const store = configureStore({
  reducer: persistedReducer
});

// Export the persistor if needed
export const persistor = persistStore(store);

export default store;
