import { configureStore } from "@reduxjs/toolkit";
import DashboardStatsReducer from "./slices/dashboard/DashboardStatsSlice";
import adminSliceReducer from "./slices/auth/AuthSlice";
import OrganizationReducer from "./slices/organization/OrganizationSlice";

export const Store = configureStore({
  reducer: {
    dashboardStatsSlice: DashboardStatsReducer,
    auth: adminSliceReducer,
    organization: OrganizationReducer,
  },
});
