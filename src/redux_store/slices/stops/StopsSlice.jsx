import { createSlice } from "@reduxjs/toolkit";

const StopsSlice = createSlice({
  name: "stops",
  initialState: {
    stopsData: [],
  },
  reducers: {
    setStopsData(state, action) {
      state.stopsData = action.payload;
    },
    clearStopsData(state) {
      state.stopsData = [];
    },
    addStopInExistingData(state, action) {
      state.stopsData.push(action.payload);
    },
    editStop(state, action) {
      const index = state.stopsData.findIndex((stop) => stop.id === action.payload.id);
      if (index !== -1) {
        state.stopsData[index] = action.payload;
      }
    },
    deleteStop(state, action) {
      state.stopsData = state.stopsData.filter((stop) => stop.id !== action.payload);
    },
  },
});

export const {
  setStopsData,
  clearStopsData,
  addStopInExistingData,
  editStop,
  deleteStop,
} = StopsSlice.actions;
export default StopsSlice.reducer;
