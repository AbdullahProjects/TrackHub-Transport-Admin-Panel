import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Sidebar from "../../components/Sidebar";
import AppBar from "../../components/AppBar";
import AppRoutes from "../../utils/routing/AppRoutes";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import Login from "../login/login_pages/Login";
import { useSelector } from "react-redux";

const MainHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminData = useSelector((state) => state.auth.adminData);
  const organizationData = useSelector(
    (state) => state.organization.organizationData
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  if (isLoginRoute && (adminData === null || organizationData === null)) {
    if (adminData === null) {
      alert("Please login to continue.");
    } else if (organizationData === null) {
      alert("Organization data not found. Please contact support.");
    }

    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col lg:ml-[155px]">
        <AppBar onMenuClick={toggleSidebar} />
        <main className="flex-1 pt-22 p-6 lg:p-8 lg:pt-22 bg-bgLight">
          <AppRoutes />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainHome;
