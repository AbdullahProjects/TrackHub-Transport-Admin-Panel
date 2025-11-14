import { createSlice } from "@reduxjs/toolkit";

const DashboardStatsSlice = createSlice({
    name: "dashboardStatsSlice",
    initialState: {
        drivers: null,
        buses: null,
        students: null,
        reports: null,
    },
    reducers: {
        setStatsData(state, action){
            state.drivers = action.payload.drivers;
            state.buses = action.payload.buses;
            state.students = action.payload.students;
            state.reports = action.payload.reports;
        }
    },
});

export const {setStatsData} = DashboardStatsSlice.actions;

export default DashboardStatsSlice.reducer;