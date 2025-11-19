import { Outlet } from "react-router";
import Sidebar from "../../../components/Sidebar";
import AppBar from "../../../components/AppBar";
import { useState } from "react";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col lg:ml-[155px]">
        <AppBar onMenuClick={toggleSidebar} />

        <main className="flex-1 pt-22 p-6 lg:p-8 lg:pt-22 bg-bgLight">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
