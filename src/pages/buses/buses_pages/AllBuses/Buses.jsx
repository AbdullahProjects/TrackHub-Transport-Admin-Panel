import React, { useState } from "react";
import AppButton from "../../../../components/AppButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import BusesStatistics from "../../buses_components/BusesStatistics";
import BusesTable from "../../buses_components/BusesTable";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";
import { IoSearch } from "react-icons/io5";

const Buses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const navigateToAddBus = () => {
    navigate(RouteNames.addBus);
  };

  return (
    <div className="buses mb-25 lg:mb-14">
      <div>
        <BusesStatistics />
        <div className="mt-10 flex flex-row justify-between">
          <Heading text={"Bus Management"} />
          <AppButton text={"Add Bus"} onTap={navigateToAddBus} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-lg px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Search by route or stop name…"
          />
        </div>
        <div className="bus-table">
          <BusesTable searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Buses;
