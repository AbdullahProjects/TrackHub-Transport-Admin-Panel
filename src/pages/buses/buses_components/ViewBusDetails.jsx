import React from "react";
import { IoMdClose } from "react-icons/io";

const ViewBusDetails = ({ data, onClose }) => {
  return (
    <div className="view-bus-details">
      <div onClick={onClose} className="fixed inset-0 bg-black/20"></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 bg-white p-6 rounded-md shadow-md shadow-black/10 w-[50%]">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">Bus Details</h2>
          <IoMdClose onClick={onClose} className="text-[22px] hover:cursor-pointer" />
        </div>
        <div className="space-y-2 mt-5">
          <p>
            <strong>Bus Name:</strong> {data.busName}
          </p>
          <p>
            <strong>License Plate:</strong> {data.licensePlate}
          </p>
          <p>
            <strong>Capacity:</strong> {data.capacity}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBusDetails;
