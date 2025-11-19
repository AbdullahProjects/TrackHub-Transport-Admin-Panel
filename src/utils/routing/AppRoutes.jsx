import { Routes, Route, Navigate } from "react-router";
import RouteNames from "./RouteNames";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../../pages/main_home/layout/AppLayout";
import AuthLayout from "../../pages/main_home/layout/AuthLayout";
import Dashboard from "../../pages/dashboard/Dashboard";
import Buses from "../../pages/buses/buses_pages/AllBuses/Buses";
import AddBus from "../../pages/buses/buses_pages/AddBus/AddBus";
import EditBus from "../../pages/buses/buses_pages/EditBus/EditBus";
import Drivers from "../../pages/drivers/drivers_pages/AllDrivers/Drivers";
import AddDriver from "../../pages/drivers/drivers_pages/AddDriver/AddDriver";
import EditDriver from "../../pages/drivers/drivers_pages/EditDriver/EditDriver";
import Organization from "../../pages/organization/organization_pages/Organization";
import Login from "../../pages/login/login_pages/Login";
import Report from "../../pages/report/Report";
import Notification from "../../pages/notification/notification_pages/Notification";
import NotFound from "../../pages/not_found/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path={RouteNames.login} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Redirect / → /dashboard */}
        <Route
          path={RouteNames.mainHome}
          element={<Navigate to={RouteNames.dashboard} replace />}
        />

        <Route path={RouteNames.dashboard} element={<Dashboard />} />
        <Route path={RouteNames.buses} element={<Buses />} />
        <Route path={RouteNames.addBus} element={<AddBus />} />
        <Route path={RouteNames.editBus} element={<EditBus />} />
        <Route path={RouteNames.drivers} element={<Drivers />} />
        <Route path={RouteNames.addDriver} element={<AddDriver />} />
        <Route path={RouteNames.editDriver} element={<EditDriver />} />
        <Route path={RouteNames.report} element={<Report />} />
        <Route path={RouteNames.notification} element={<Notification />} />
        <Route path={RouteNames.organization} element={<Organization />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
