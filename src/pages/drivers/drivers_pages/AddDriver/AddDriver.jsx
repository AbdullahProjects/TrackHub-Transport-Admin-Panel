import React, { useState, useRef } from "react";
import BackButton from "../../../../components/BackButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import AppButton from "../../../../components/AppButton";
import { addDriver } from "../../firebase/DriversFirebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { clearDriversData } from "../../../../redux_store/slices/drivers/DriversSlide";
import RouteNames from "../../../../utils/routing/RouteNames";
import { uploadFileToCloudinary } from "../../../../services/cloudinary/UploadFileToCloudinary";

const AddDriver = () => {
  const dispatch = useDispatch();
  // Getting state data from redux store
  const adminData = useSelector((state) => state.auth.adminData);

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // When user selects file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("Selected file:", file);

    const imageUrl = URL.createObjectURL(file);
    console.log("Generated image URL:", imageUrl);
    setImage(imageUrl);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();
  const [addingDriverLoading, setAddingDriverLoading] = useState(false);
  const [formData, setFormData] = useState({
    driverName: "",
    phoneNumber: "",
    experience: "",
    profileUrl: "",
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

      const file = fileInputRef.current.files[0];
      if (image !== null) {
        const res = await uploadFileToCloudinary(file);
        if (res.error) {
          toast.error("Image upload failed: " + res.error);
          setAddingDriverLoading(false);
          return;
        }
        formData.profileUrl = res.url;
      }

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
      <div className="mt-6 bg-white px-8 py-10 rounded-md shadow-md shadow-black/5 flex flex-col gap-6">
        <div className="flex justify-start items-center my-6">
          <div
            className="
          relative w-30 h-30 rounded-full bg-gray-100 
          flex justify-center items-center cursor-pointer 
          overflow-hidden group shadow-sm"
            onClick={openFilePicker}
          >
            {/* If image URL is null → show camera icon */}
            {!image && (
              <FaCamera className="text-2xl text-gray-500 group-hover:text-black transition" />
            )}

            {/* If image is not null → show image */}
            {image && (
              <>
                <img
                  src={image}
                  alt="uploaded"
                  className="w-full h-full object-cover"
                />

                {/* Overlay on hover */}
                <div
                  className="
                absolute inset-0 
                group-hover:bg-black/40 transition-all duration-200"
                />

                {/* Camera icon on hover */}
                <FaCamera
                  className="
                absolute text-white text-2xl opacity-0 
                group-hover:opacity-100 transition-all duration-200"
                />
              </>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
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
