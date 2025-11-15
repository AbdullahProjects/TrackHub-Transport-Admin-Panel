import React, { useState } from "react";
import BusForm from "./BusForm";
import AppButton from "../../components/AppButton";
import { Heading } from "../../components/HeadingAndSubheading";
import BusesStatistics from "./buses_components/BusesStatistics";
import BusesTable from "./buses_components/BusesTable";

const Buses = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddBus = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = (formData) => {
    // Handle form submission here
    console.log("Bus data:", formData);
    // You can add API call here to save the bus
    setShowForm(false);
    // Optionally show success message
  };

  if (showForm) {
    return <BusForm onCancel={handleCancel} onSubmit={handleSubmit} />;
  }

  return (
    <div className="buses p-8 mb-12">
      <BusesStatistics />
      <div className="mt-8 flex flex-row justify-between">
        <Heading text={"Bus Management"} />
        <AppButton text={"Add Bus"} onTap={() => console.log("Add Bus Tap")}/>
      </div>
      <div className="bus-table">
        <BusesTable/>
      </div>
    </div>
  );
};

export default Buses;
