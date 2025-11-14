import { configureStore } from "@reduxjs/toolkit";
import DashboardStatsReducer from './slices/dashboard/DashboardStatsSlice'

export const Store = configureStore({
    reducer: {
        dashboardStatsSlice: DashboardStatsReducer
    }
})