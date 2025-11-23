import React, { useState } from "react";
import BackButton from "../../../../components/BackButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import Images from "../../../../utils/common/Images";
import AppButton from "../../../../components/AppButton";
import { addBus } from "../../firebase/BusesFirebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearBusesData } from "../../../../redux_store/slices/buses/BusesSlice";
import RouteNames from "../../../../utils/routing/RouteNames";

const AddBus = () => {
  const dispatch = useDispatch();
  // Getting state data from redux store
  const adminData = useSelector((state) => state.auth.adminData);

  const navigate = useNavigate();
  const [addingBusLoading, setAddingBusLoading] = useState(false);
  const [formData, setFormData] = useState({
    busName: "",
    licensePlate: "",
    capacity: "",
    model: "",
    year: "",
    status: "active",
    organizationId: adminData.organizationId,
    adminId: adminData.id,
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
    try {
      setAddingBusLoading(true);
      await addBus(formData);
      toast.success("Bus added successfully!");
      dispatch(clearBusesData());
      // Navigate back to previous page after adding bus
      navigate(RouteNames.buses, { replace: true });
    } catch (error) {
      toast.error("Error adding bus: " + error.message);
    } finally {
      setAddingBusLoading(false);
    }
  };

  return (
    <div className="add-bus mb-8 lg:mb-14">
      <div className="flex flex-row gap-3 items-center">
        <BackButton />
        <Heading text={"Add Bus Details"} />
      </div>
      <div className="mt-6 bg-white px-8 py-10 rounded-md shadow-md shadow-black/5 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bus Name */}
            <div>
              <label
                htmlFor="busName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bus or Route Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="busName"
                name="busName"
                value={formData.busName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Route no 01 Defense Morr"
              />
            </div>

            <div>
              <label
                htmlFor="licensePlate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                License Plate
              </label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. ABC-1234"
              />
            </div>

            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Capacity <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter passenger capacity"
              />
            </div>

            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter bus model"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter year"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status <span className="text-red-600">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <AppButton
              isSubmitButton={true}
              text="Add Bus"
              isLoading={addingBusLoading}
              loadingText="Adding..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBus;
