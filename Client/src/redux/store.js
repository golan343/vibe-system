import { configureStore } from '@reduxjs/toolkit';
import daysSlice from './features/daysSlice';
import statusSlice from './features/statusSlice';
import userReducer from './features/userSlice';
const store = configureStore({
  reducer: {
    auth: userReducer,
    statuses: statusSlice,
    days: daysSlice
  },
});

export default store;