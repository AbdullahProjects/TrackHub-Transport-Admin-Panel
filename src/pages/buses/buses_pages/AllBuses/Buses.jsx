import React, { useState } from "react";
import BusForm from "../AddBus/AddBus";
import AppButton from "../../../../components/AppButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import BusesStatistics from "../../buses_components/BusesStatistics";
import BusesTable from "../../buses_components/BusesTable";

const Buses = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddBus = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = (formData) => {
    console.log("Bus data:", formData);
    setShowForm(false);
  };

  if (showForm) {
    return <BusForm onCancel={handleCancel} onSubmit={handleSubmit} />;
  }

  return (
    <div className="buses mb-25 lg:mb-14">
      <div>
        <BusesStatistics />
        <div className="mt-10 flex flex-row justify-between">
          <Heading text={"Bus Management"} />
          <AppButton
            text={"Add Bus"}
            onTap={handleAddBus}
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
