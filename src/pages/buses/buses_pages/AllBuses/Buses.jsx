import React, { useState } from "react";
import AppButton from "../../../../components/AppButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import BusesStatistics from "../../buses_components/BusesStatistics";
import BusesTable from "../../buses_components/BusesTable";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";

const Buses = () => {
  const navigate = useNavigate();

  const navigateToAddBus = () => {
    navigate(RouteNames.addBus);
  };

  return (
    <div className="buses mb-25 lg:mb-14">
      <div>
        <BusesStatistics />
        <div className="mt-10 flex flex-row justify-between">
          <Heading text={"Bus Management"} />
          <AppButton
            text={"Add Bus"}
            onTap={navigateToAddBus}
          />
        </div>
        <div className="bus-table">
          <BusesTable />
        </div>
      </div>
    </div>
  );
};

export default Buses;
