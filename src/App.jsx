import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/AppBar";
import AppRoutes from "./utils/routing/AppRoutes";
import Login from "./pages/login/login_pages/Login";
import { ToastContainer } from "react-toastify";
import Images from "./utils/common/Images";
import { MoonLoader } from "react-spinners";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = "abdullah@gmail.com";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isLogin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full gap-5">
        <img src={Images.logo} alt="Logo" className="w-[200px]" />
        <MoonLoader
          color={"var(--color-primary)"}
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col lg:ml-[10%]">
        <AppBar onMenuClick={toggleSidebar} adminName={adminName} />
        <main className="flex-1 pt-22 p-6 lg:p-8 lg:pt-22 bg-bgLight">
          <AppRoutes />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
