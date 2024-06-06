
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import selectedGroupReducer from './scheduleSclice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    selectedGroup: selectedGroupReducer,
  },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
      immutableCheck: false, // Disable immutable check
    }),
});

export default store;
