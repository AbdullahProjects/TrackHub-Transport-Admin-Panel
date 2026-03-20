import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDirectionsBus, MdPerson, MdConfirmationNumber } from "react-icons/md";
import { FaCar, FaUsers, FaCircle } from "react-icons/fa";
import { Link } from "react-router";
import RouteNames from "../../../utils/routing/RouteNames";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { getDriverById } from "../../drivers/firebase/DriversFirebase";

const ViewBusDetails = ({ data, onClose, onDeleteClick }) => {
  const [driverName, setDriverName] = useState(null);

  useEffect(() => {
    if (data.assignedDriverId) {
      getDriverById(data.assignedDriverId)
        .then((d) => setDriverName(d?.name))
        .catch(() => setDriverName(null));
    } else {
      setDriverName(null);
    }
  }, [data.assignedDriverId]);

  const statusColor =
    data.status === "active"
      ? "text-green-600"
      : data.status === "maintenance"
        ? "text-amber-600"
        : "text-gray-500";

  return (
    <div className="view-bus-details">
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl rounded-md bg-white p-6 shadow-xl">
          <div className="mb-3 flex flex-row items-center justify-between border-b border-black/30 pb-2">
            <h2 className="text-2xl font-bold text-gray-800">Bus details</h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-gray-500 transition-all duration-200 hover:text-black"
            >
              <IoMdClose size={26} />
            </button>
          </div>

          <div className="mb-3 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
              <MdDirectionsBus className="h-10 w-10" />
            </div>
          </div>

          <div className="space-y-1.5 text-gray-700">
            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <MdDirectionsBus className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Bus / route name</p>
                <p className="text-base">{data.busName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaCar className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">License plate</p>
                <p className="text-base">{data.licensePlate || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaUsers className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Capacity</p>
                <p className="text-base">{data.capacity}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaCircle className={`shrink-0 text-lg ${statusColor}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className={`text-base capitalize ${statusColor}`}>{data.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <MdConfirmationNumber className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Stop name</p>
                <p className="text-base">{data.stopName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <MdPerson className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Allocated driver</p>
                <p className="text-base">{driverName || "No driver assigned"}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onDeleteClick?.(data.id);
              }}
              className="flex items-center gap-2 rounded-md border border-red-500 px-4 py-2.5 text-base font-medium text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
            >
              <AiFillDelete className="text-lg" />
              Delete
            </button>
            <Link
              to={RouteNames.editBus.replace(":busId", data.id)}
              onClick={onClose}
              className="flex items-center gap-2 rounded-md border border-menuActiveColor px-4 py-2.5 text-base font-medium transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              <MdModeEdit className="text-lg" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBusDetails;
