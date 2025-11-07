import React from "react";
import { Link, useLocation } from "react-router";
import Images from "../utils/common/Images";
import RouteNames from "../utils/routing/RouteNames";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: RouteNames.dashboard,
      label: "Dashboard",
      icon: Images.dashboardMenuIcon,
    },
    { path: RouteNames.drivers, label: "Drivers", icon: Images.driverMenuIcon },
    { path: RouteNames.buses, label: "Buses", icon: Images.busMenuIcon },
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
          w-[180px] lg:w-[10%]
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex flex-col items-center gap-3 px-2 py-6 transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-menuActiveColor text-white shadow-lg"
                    : "hover:bg-menuActiveColor hover:text-white"
                }`}
              >
                <img
                  src={item.icon}
                  alt="Menu Icon"
                  className="w-[23px] h-[23px] object-contain"
                />
                <span className="font-medium text-[14px]">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
