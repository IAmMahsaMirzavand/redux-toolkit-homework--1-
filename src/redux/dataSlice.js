import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], 
  filters: {
    role: null,
    level: null,
    languages: []
  }
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    addFilter(state, action) {
      const { type, value } = action.payload;
      if (type === 'role' || type === 'level') {
        state.filters[type] = value;
      } else if (type === 'languages') {
        if (!state.filters.languages.includes(value)) {
          state.filters.languages.push(value);
        }
      }
    },
    removeFilter(state, action) {
      const { type, value } = action.payload;
      if (type === 'role' || type === 'level') {
        state.filters[type] = null;
      } else if (type === 'languages') {
        state.filters.languages = state.filters.languages.filter(lang => lang !== value);
      }
    },
    clearFilters(state) {
      state.filters = {
        role: null,
        level: null,
        languages: []
      };
    }
  }
});

export const { setData, addFilter, removeFilter, clearFilters } = dataSlice.actions;
export default dataSlice.reducer;
