import React, { useState } from "react";
import BusForm from "./BusForm";

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
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Buses</h1>
          <p className="text-gray-600">
            Manage your bus fleet. Track bus information, maintenance, and
            assignments.
          </p>
        </div>
        <button
          onClick={handleAddBus}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-500 transition-colors font-medium shadow-md"
        >
          + Add Bus
        </button>
      </div>

      {/* Bus list/component will go here */}
      <div className="mt-8">
        <p className="text-gray-500">Bus list will be displayed here...</p>
      </div>
    </div>
  );
};

export default Buses;

