import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/AppBar";
import AppRoutes from "./utils/routing/AppRoutes";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = "Abdullah Khan";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col lg:ml-[10%]">
        <AppBar onMenuClick={toggleSidebar} adminName={adminName} />
        <main className="flex-1 overflow-y-auto pt-16 bg-white">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
