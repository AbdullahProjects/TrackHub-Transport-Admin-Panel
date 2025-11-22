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
import CustomDatePicker from "../../../../components/DatePicker";
import dayjs from "dayjs";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import compressImage from "../../../../utils/image_compression/ImageCompression";
import generatePassword from "../../../../utils/password_generator/PasswordGenerator";
import {
  validateName,
  validatePhone,
  validatePassword,
  checkUsernameAndPasswordExists,
} from "../../../../utils/form_validations/FormValidations";

const AddDriver = () => {
  const dispatch = useDispatch();
  // Getting state data from redux store
  const adminData = useSelector((state) => state.auth.adminData);

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({
    name: null,
    phone: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);

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
    driverName: null,
    driverEmail: null,
    phoneNumber: null,
    registeredDate: null,
    profileUrl: null,
    username: "THDR-",
    password: null,
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

  const handleUsername = (driverNameChange) => {
    const namePart = driverNameChange;
    return `THDR-${namePart}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input fields
    const nameError = validateName(formData.driverName);
    const phoneError = validatePhone(formData.phoneNumber);
    const passwordError = validatePassword(formData.password);
    setErrors({ name: nameError, phone: phoneError, password: passwordError });

    // If there are validation errors, do not proceed
    if (nameError || phoneError || passwordError) {
      return;
    }
    try {
      setAddingDriverLoading(true);

      // Check username and password uniqueness
      const exists = await checkUsernameAndPasswordExists(
        formData.username,
        formData.password
      );
      if (exists === null) {
        toast.error("Error checking username and password uniqueness.");
        setAddingDriverLoading(false);
        return;
      }

      if (exists) {
        toast.error(
          "Username and Password combination already exists. Please modify them."
        );
        setAddingDriverLoading(false);
        return;
      }

      const file = fileInputRef.current.files[0];
      if (image !== null) {
        const compressedImage = await compressImage({ image: file });
        const res = await uploadFileToCloudinary(compressedImage);
        if (res.error) {
          toast.error("Image upload failed: " + res.error);
          setAddingDriverLoading(false);
          return;
        }
        formData.profileUrl = res.url;
      }

      console.log("Final Driver Data to be added:", formData);

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
        <div className="flex justify-start items-center my-1">
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
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Driver Name */}
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Driver Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={(e) => {
                  handleChange(e);
                  const generatedUsername = handleUsername(e.target.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    username: generatedUsername,
                  }));
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Route no 01 Defense Morr"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Driver Email */}
            <div>
              <label
                htmlFor="driverEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email{" "}
                <span className="text-textLight text-[13px]">(Optional)</span>
              </label>
              <input
                type="email"
                id="driverEmail"
                name="driverEmail"
                value={formData.driverEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. driver@gmail.com"
              />
            </div>

            {/* Driver Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-600">*</span>{" "}
                <span className="text-textLight text-[13px]">
                  (Without dash)
                </span>
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
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Driver Registered Date */}
            <div>
              <label
                htmlFor="registeredDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Registered Date <span className="text-red-600">*</span>
              </label>
              <CustomDatePicker
                value={formData.registeredDate}
                onChange={(date) => {
                  if (date && dayjs.isDayjs(date)) {
                    setFormData({
                      ...formData,
                      registeredDate: date.format("DD/MM/YYYY"),
                    });
                  } else {
                    setFormData({
                      ...formData,
                      registeredDate: null,
                    });
                  }
                }}
              />
            </div>
          </div>

          {/* Driver Login Credentials */}
          <div className="pt-4">
            <h1 className="text-[18px] font-bold">Driver Login Credentials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              {/* UserName */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  UserName{" "}
                  <span className="text-textLight text-[13px]">
                    (Automatically Generated)
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Automatically generated username"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="flex flex-row justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <p
                    onClick={() =>
                      setFormData({ ...formData, password: generatePassword() })
                    }
                    className="text-[13px] font-medium text-primary hover:cursor-pointer hover:underline"
                  >
                    Generate Strong Password
                  </p>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Create strong password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[45px] right-0 text-[15px] px-3 hover:cursor-pointer"
                >
                  {!showPassword ? <GoEyeClosed /> : <GoEye />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
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
