import React, { useState } from "react";
import AppButton from "../../../components/AppButton";

const Notification = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetUser: "passengers",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Notification</h1>
      <div className="bg-white mt-4 rounded-md shadow-sm shadow-black/5 px-8 py-10">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bus Name */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Route change"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter message"
              />
            </div>

            <div>
              <label
                htmlFor="targetUser"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Target Users
              </label>
              <select
                id="targetUser"
                name="targetUser"
                value={formData.targetUser}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="drivers">Drivers</option>
                <option value="passengers">Passengers</option>
              </select>
            </div>
          </div>

          <div className="pt-3">
            <AppButton
              isSubmitButton={true}
              text="Send Notification"
              isLoading={false}
              loadingText="Adding..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notification;
