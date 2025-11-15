import { Routes, Route } from "react-router";
import RouteNames from "./RouteNames";
import Dashboard from "../../pages/dashboard/Dashboard";
import Drivers from "../../pages/drivers/Drivers";
import Buses from "../../pages/buses/buses_pages/AllBuses/Buses";
import Organization from "../../pages/organization/Organization";
import Report from "../../pages/report/Report";
import Notification from "../../pages/notification/Notification";
import AddBus from "../../pages/buses/buses_pages/AddBus/AddBus";
import EditBus from "../../pages/buses/buses_pages/EditBus/EditBus";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RouteNames.dashboard} element={<Dashboard />} />
      <Route path={RouteNames.drivers} element={<Drivers />} />
      <Route path={RouteNames.buses} element={<Buses />} />
      <Route path={RouteNames.organization} element={<Organization />} />
      <Route path={RouteNames.report} element={<Report />} />
      <Route path={RouteNames.notification} element={<Notification />} />
      <Route path={RouteNames.addBus} element={<AddBus />} />
      <Route path={RouteNames.editBus} element={<EditBus />} />
    </Routes>
  );
};

export default AppRoutes;
