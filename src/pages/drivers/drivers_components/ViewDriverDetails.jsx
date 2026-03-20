import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaPhone, FaCalendarAlt, FaEnvelope, FaKey } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router";
import RouteNames from "../../../utils/routing/RouteNames";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

const ViewDriverDetails = ({ data, onClose, onDeleteClick }) => {
  return (
    <div className="view-driver-details">
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl rounded-md bg-white p-6 shadow-xl">
          <div className="mb-3 flex flex-row items-center justify-between border-b border-black/30 pb-2">
            <h2 className="text-2xl font-bold text-gray-800">Driver details</h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-gray-500 transition-all duration-200 hover:text-black"
            >
              <IoMdClose size={26} />
            </button>
          </div>

          <div className="mb-3 flex justify-center">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100">
              {data.profileUrl ? (
                <img
                  src={data.profileUrl}
                  alt="Driver"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <CiUser className="text-4xl text-gray-600" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5 text-gray-700">
            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaUser className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base">{data.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaKey className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Login</p>
                <p className="text-base">{data.username}</p>
                <p className="text-sm text-gray-600">••••••••</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaEnvelope className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{data.email || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaPhone className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-base">{data.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <FaCalendarAlt className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Registered</p>
                <p className="text-base">{data.registeredDate}</p>
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
              to={RouteNames.editDriver.replace(":driverId", data.id)}
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

export default ViewDriverDetails;
