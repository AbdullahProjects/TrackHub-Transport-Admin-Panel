import React from "react";
import { Link, useLocation } from "react-router";
import Images from "../utils/common/Images";
import RouteNames from "../utils/routing/RouteNames";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlinePlace } from "react-icons/md";
import { logoutUser } from "../pages/login/firebase/LoginFirebase";
import { useDispatch } from "react-redux";
import { clearAdminData } from "../redux_store/slices/auth/AuthSlice";
import { useNavigate } from "react-router";

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
    dispatch(clearAdminData());
    navigate(RouteNames.login);
  }

  const menuItems = [
    {
      path: RouteNames.dashboard,
      label: "Dashboard",
      icon: Images.dashboardMenuIcon,
    },
    { path: RouteNames.drivers, label: "Drivers", icon: Images.driverMenuIcon },
    { path: RouteNames.buses, label: "Buses", icon: Images.busMenuIcon },
    {
      path: RouteNames.stops,
      label: "Stops",
      icon: null,
      MenuIcon: MdOutlinePlace,
    },
    {
      path: RouteNames.organization,
      label: "Organization",
      icon: Images.organizationMenuIcon,
    },
    { path: RouteNames.report, label: "Report", icon: Images.reportMenuIcon },
    {
      path: RouteNames.notification,
      label: "Notification",
      icon: Images.notificationMenuIcon,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    // console.log(location.pathname, path, location.pathname.startsWith(path));
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          sidebar fixed top-0 left-0 h-screen bg-primary text-white overflow-y-auto z-50
          transition-transform duration-300 ease-in-out lg:shadow-lg shadow-gray-200
          w-[180px] lg:w-[155px]
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          {/* Menu Items */}
          <nav>
            {menuItems.map((item) => {
              const MenuIcon = item.MenuIcon;
              return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex flex-col items-center gap-3 px-2 py-6 transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-menuActiveColor text-white shadow-lg"
                    : "hover:bg-menuActiveColor/30 hover:text-white"
                }`}
              >
                {MenuIcon ? (
                  <MenuIcon className="h-[23px] w-[23px]" aria-hidden />
                ) : (
                  <img
                    src={item.icon}
                    alt="Menu Icon"
                    className="h-[23px] w-[23px] object-contain"
                  />
                )}
                <span className="font-medium text-[14px]">{item.label}</span>
              </Link>
            );
            })}

            <div className="w-full h-px bg-gray-300"></div>

            {/* Logout */}
            <div onClick={logoutHandler} className="flex flex-row gap-2 items-center justify-center py-8 hover:cursor-pointer">
              <AiOutlineLogout />
              <h1 className="text-center">
                Logout
              </h1>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
