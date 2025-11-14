import React from "react";
import DashboardStatistics from "./dashboard_components/DashboardStatistics";
import OngoingBuses from "./dashboard_components/OngoingBuses";

const Dashboard = () => {
  return (
    <div className="p-8">
      {/* Statistics */}
      <DashboardStatistics />

      {/* Ongoing Buses */}
      {/* <OngoingBuses /> */}
    </div>
  );
};

export default Dashboard;
