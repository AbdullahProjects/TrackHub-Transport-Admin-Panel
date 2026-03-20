import { configureStore } from "@reduxjs/toolkit";
import DashboardStatsReducer from "./slices/dashboard/DashboardStatsSlice";
import adminSliceReducer from "./slices/auth/AuthSlice";
import OrganizationReducer from "./slices/organization/OrganizationSlice";
import BusesReducer from "./slices/buses/BusesSlice";
import DriversReducer from "./slices/drivers/DriversSlide";
import StopsReducer from "./slices/stops/StopsSlice";

export const Store = configureStore({
  reducer: {
    dashboardStatsSlice: DashboardStatsReducer,
    auth: adminSliceReducer,
    organization: OrganizationReducer,
    buses: BusesReducer,
    drivers: DriversReducer,
    stops: StopsReducer,
  },
});
