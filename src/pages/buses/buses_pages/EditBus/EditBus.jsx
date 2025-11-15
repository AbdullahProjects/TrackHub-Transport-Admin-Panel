import React, {useState} from "react";
import { Heading } from "../../../../components/HeadingAndSubheading";
import BackButton from "../../../../components/BackButton";
import Images from "../../../../utils/common/Images";
import AppButton from "../../../../components/AppButton";

const EditBus = () => {
  const [formData, setFormData] = useState({
    busNumber: "",
    licensePlate: "",
    capacity: "",
    model: "",
    year: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="edit-bus mb-8 lg:mb-14">
      <div className="flex flex-row gap-3 items-center">
        <BackButton />
        <Heading text={"Edit Bus Details"} />
      </div>
      <div className="mt-6 bg-white px-8 py-12 rounded-md shadow-md shadow-black/5 flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <img
            src={Images.dummyBusImage}
            alt="Bus Image"
            className="w-[110px] h-auto rounded-full"
          />
          {/* <AppButton
            text="Save Changes"
            onTap={() => console.log("Saved Changes")}
          /> */}
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="busNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bus Number *
              </label>
              <input
                type="text"
                id="busNumber"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter bus number"
              />
            </div>

            <div>
              <label
                htmlFor="licensePlate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                License Plate *
              </label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter license plate"
              />
            </div>

            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Capacity *
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
                Model *
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter bus model"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Year *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
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
                Status *
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
            <AppButton isSubmitButton={true} text="Update Bus" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBus;
