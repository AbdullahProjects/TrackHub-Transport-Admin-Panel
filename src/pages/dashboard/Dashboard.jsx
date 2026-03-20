import React from "react";
import DashboardStatistics from "./dashboard_components/DashboardStatistics";
import DashboardCharts from "./dashboard_components/DashboardCharts";

const Dashboard = () => {
  return (
    <div className="mb-14">
      <DashboardStatistics />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
