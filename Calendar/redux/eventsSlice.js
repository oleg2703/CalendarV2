// redux/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.items = action.payload;
    },
    addEvent: (state, action) => {
      const { title, description, date } = action.payload;
      if (!state.items[date]) {
        state.items[date] = [];
      }
      state.items[date].push({ name: title, description, height: 50, day: date });
    },
    deleteEvent: (state, action) => {
        const { date, index } = action.payload;
        if (state.items[date]) {
          state.items[date] = state.items[date].filter((_, i) => i !== index);
          if (state.items[date].length === 0) {
            delete state.items[date];
          }
        }
      }
      
  },
});

export const { setEvents, addEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
