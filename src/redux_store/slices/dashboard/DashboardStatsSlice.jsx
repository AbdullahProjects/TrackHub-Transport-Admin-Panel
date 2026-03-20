import { createSlice } from "@reduxjs/toolkit";

const DashboardStatsSlice = createSlice({
  name: "dashboardStatsSlice",
  initialState: {
    drivers: null,
    buses: null,
    stops: null,
  },
  reducers: {
    setStatsData(state, action) {
      state.drivers = action.payload.drivers;
      state.buses = action.payload.buses;
      state.stops = action.payload.stops;
    },
  },
});

export const { setStatsData } = DashboardStatsSlice.actions;

export default DashboardStatsSlice.reducer;
