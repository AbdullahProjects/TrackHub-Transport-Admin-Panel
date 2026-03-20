import React, { useState } from "react";
import AppButton from "../../../../components/AppButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import DriversTable from "../../drivers_components/DriversTable";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";
import { IoSearch } from "react-icons/io5";

const Drivers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const navigateToAddDriver = () => {
    navigate(RouteNames.addDriver);
  };

  return (
    <div className="drivers mb-25 lg:mb-14">
      <div>
        <div className="mt-2 flex flex-row justify-between">
          <Heading text={"Driver Management"} />
          <AppButton text={"Add Driver"} onTap={navigateToAddDriver} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-lg px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Enter driver name to search…"
          />
        </div>
        <div className="driver-table">
          <DriversTable searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Drivers;
