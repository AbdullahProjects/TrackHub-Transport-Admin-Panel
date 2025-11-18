import React, { useState } from "react";
import AppButton from "../../../../components/AppButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import DriversTable from "../../drivers_components/DriversTable";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";

const Drivers = () => {
  const navigate = useNavigate();

  const navigateToAddDriver = () => {
    navigate(RouteNames.addDriver);
  };

  return (
    <div className="drivers mb-25 lg:mb-14">
      <div>
        <div className="mt-5 flex flex-row justify-between">
          <Heading text={"Driver Management"} />
          <AppButton
            text={"Add Driver"}
            onTap={navigateToAddDriver}
          />
        </div>
        <div className="driver-table">
          <DriversTable />
        </div>
      </div>
    </div>
  );
};

export default Drivers;
