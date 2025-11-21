import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaPhone, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

const ViewDriverDetails = ({ data, onClose }) => {
  return (
    <div className="view-driver-details">
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40"></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-xl p-6 rounded-md shadow-xl relative">
          <div className="flex flex-row justify-between items-center border-b border-black/30 pb-3 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Driver Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black hover:cursor-pointer transition-all duration-200"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <div className="flex flex-row justify-center pt-3 pb-5">
            <div className="w-22 h-22 rounded-full overflow-hidden bg-gray-100">
            {data.profileUrl !== null ? (
              <img
                src={data.profileUrl}
                alt="Driver Picture"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CiUser className="text-gray-900 text-3xl" />
              </div>
            )}
          </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4 text-gray-700">
            {/* Name */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
              <FaUser className="text-primary text-md" />
              <p className="text-md">
                <strong>Name:</strong> {data.driverName}
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
              <FaEnvelope className="text-primary text-md" />
              <p className="text-md">
                <strong>Email:</strong> {data.email || "N/A"}
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
              <FaPhone className="text-primary text-md" />
              <p className="text-md">
                <strong>Phone:</strong> {data.phoneNumber}
              </p>
            </div>

            {/* Registration Date */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
              <FaCalendarAlt className="text-primary text-md" />
              <p className="text-md">
                <strong>Registered On:</strong> {data.registeredDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDriverDetails;
