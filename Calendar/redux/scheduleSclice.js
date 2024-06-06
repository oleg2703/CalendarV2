// selectedGroupSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  course: '',
  group: '',
  subgroup: '',
  week: '',
};

const selectedGroupSlice = createSlice({
  name: 'selectedGroup',
  initialState,
  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
    },
    setGroup(state, action) {
      state.group = action.payload;
    },
    setSubgroup(state, action) {
      state.subgroup = action.payload;
    },
    setWeek(state, action) {
      state.week = action.payload;
    },
    resetSelection(state) {
      state.course = '';
      state.group = '';
      state.subgroup = '';
      state.week = '';
    },
  },
});

export const { setCourse, setGroup, setSubgroup, setWeek, resetSelection } = selectedGroupSlice.actions;

export default selectedGroupSlice.reducer;
