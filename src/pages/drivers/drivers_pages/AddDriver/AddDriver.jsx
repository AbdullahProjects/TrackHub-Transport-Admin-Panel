import React, { useState } from "react";
import BackButton from "../../../../components/BackButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import Images from "../../../../utils/common/Images";
import AppButton from "../../../../components/AppButton";
import { addDriver } from "../../firebase/DriversFirebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearDriversData } from "../../../../redux_store/slices/drivers/DriversSlide";
import RouteNames from "../../../../utils/routing/RouteNames";

const AddDriver = () => {
  const dispatch = useDispatch();
  // Getting state data from redux store
  const adminData = useSelector((state) => state.auth.adminData);

  const navigate = useNavigate();
  const [addingDriverLoading, setAddingDriverLoading] = useState(false);
  const [formData, setFormData] = useState({
    driverName: "",
    phoneNumber: "",
    experience: "",
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
      setAddingDriverLoading(true);
      await addDriver(formData);
      toast.success("Driver added successfully!");
      dispatch(clearDriversData());
      // Navigate back to previous page after adding bus
      navigate(RouteNames.drivers, { replace: true });
    } catch (error) {
      toast.error("Error adding driver: " + error.message);
    } finally {
      setAddingDriverLoading(false);
    }
  };

  return (
    <div className="add-driver mb-8 lg:mb-14">
      <div className="flex flex-row gap-3 items-center">
        <BackButton />
        <Heading text={"Add Driver Details"} />
      </div>
      <div className="mt-6 bg-white px-8 py-12 rounded-md shadow-md shadow-black/5 flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <img
            src={Images.dummyBusImage}
            alt="Bus Image"
            className="w-[110px] h-auto rounded-full"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Driver Name */}
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Driver Name *
              </label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Route no 01 Defense Morr"
              />
            </div>

            {/* Driver Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. 03xxx-xxxxxxx"
              />
            </div>

            {/* Driver Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Experience *
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter driver experience"
              />
            </div>
          </div>

          <div className="pt-4">
            <AppButton
              isSubmitButton={true}
              text="Add Driver"
              isLoading={addingDriverLoading}
              loadingText="Adding..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
