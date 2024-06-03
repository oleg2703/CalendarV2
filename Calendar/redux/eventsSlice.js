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
      state.items[date].push({ name: title, description, height: 50, day: date, reminder: null });
    },
    deleteEvent: (state, action) => {
      const { date, index } = action.payload;
      if (state.items[date]) {
        state.items[date] = state.items[date].filter((_, i) => i !== index);
        if (state.items[date].length === 0) {
          delete state.items[date];
        }
      }
    },
    setReminder: (state, action) => {
      const { date, index, reminder } = action.payload;
      if (state.items[date]) {
        state.items[date][index].reminder = reminder;
      }
    },
    removeReminder: (state, action) => {
      const { date, index } = action.payload;
      if (state.items[date]) {
        state.items[date][index].reminder = null;
      }
    },
  },
});

export const { setEvents, addEvent, deleteEvent, setReminder, removeReminder } = eventsSlice.actions;
export default eventsSlice.reducer;
