import { Routes, Route } from "react-router";
import RouteNames from "./RouteNames";
import Dashboard from "../../pages/dashboard/Dashboard";
import Buses from "../../pages/buses/buses_pages/AllBuses/Buses";
import Organization from "../../pages/organization/organization_pages/Organization";
import Report from "../../pages/report/Report";
import Notification from "../../pages/notification/notification_pages/Notification";
import AddBus from "../../pages/buses/buses_pages/AddBus/AddBus";
import Login from "../../pages/login/login_pages/Login";
import EditBus from "../../pages/buses/buses_pages/EditBus/EditBus";
import MainHome from "../../pages/main_home/MainHome";
import Drivers from "../../pages/drivers/drivers_pages/AllDrivers/Drivers";
import AddDriver from "../../pages/drivers/drivers_pages/AddDriver/AddDriver";
import EditDriver from "../../pages/drivers/drivers_pages/EditDriver/EditDriver";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RouteNames.mainHome} element={<MainHome />} />
      <Route path={RouteNames.dashboard} element={<Dashboard />} />
      <Route path={RouteNames.drivers} element={<Drivers />} />
      <Route path={RouteNames.buses} element={<Buses />} />
      <Route path={RouteNames.organization} element={<Organization />} />
      <Route path={RouteNames.report} element={<Report />} />
      <Route path={RouteNames.notification} element={<Notification />} />
      <Route path={RouteNames.addBus} element={<AddBus />} />
      <Route path={RouteNames.editBus} element={<EditBus />} />
      <Route path={RouteNames.addDriver} element={<AddDriver />} />
      <Route path={RouteNames.editDriver} element={<EditDriver />} />
      <Route path={RouteNames.login} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
