
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import selectedGroupReducer from './scheduleSclice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    selectedGroup: selectedGroupReducer,
  },
});

export default store;
