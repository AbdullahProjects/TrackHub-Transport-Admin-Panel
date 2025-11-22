import React, { useEffect, useState, useRef } from "react";
import { Heading } from "../../../../components/HeadingAndSubheading";
import BackButton from "../../../../components/BackButton";
import Images from "../../../../utils/common/Images";
import AppButton from "../../../../components/AppButton";
import { getDriverById } from "../../firebase/DriversFirebase";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { MoonLoader } from "react-spinners";
import { updateDriverDataInFirestore } from "../../firebase/DriversFirebase";
import { useDispatch } from "react-redux";
import { clearDriversData } from "../../../../redux_store/slices/drivers/DriversSlide";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";
import { FaCamera } from "react-icons/fa";
import CustomDatePicker from "../../../../components/DatePicker";
import dayjs from "dayjs";
import { uploadFileToCloudinary } from "../../../../services/cloudinary/UploadFileToCloudinary";
import compressImage from "../../../../utils/image_compression/ImageCompression";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import {
  checkUsernameAndPasswordExistsExceptCurrentUser,
  validateName,
  validatePassword,
  validatePhone,
} from "../../../../utils/form_validations/FormValidations";
import generatePassword from "../../../../utils/password_generator/PasswordGenerator";

const EditDriver = () => {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataUpdatingLoading, setDataUpdatingLoading] = useState(false);
  const [driverData, setDriverData] = useState(null);

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({
    name: null,
    phone: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleUsername = (driverNameChange) => {
    const namePart = driverNameChange;
    return `THDR-${namePart}`;
  };

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

  useEffect(() => {
    const fetchDriverDataById = async () => {
      try {
        const data = await getDriverById(driverId);
        setFormData({
          id: data.id,
          driverName: data.driverName,
          driverEmail: data.driverEmail,
          phoneNumber: data.phoneNumber,
          registeredDate: data.registeredDate,
          profileUrl: data.profileUrl,
          username: data.username,
          password: data.password,
        });
        setImage(data.profileUrl);

        setDriverData(data);
      } catch (error) {
        console.error("Error fetching bus data: ", error);
        toast.error("Error fetching bus data: " + error.message);
        setDriverData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDriverDataById();
  }, []);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setDataUpdatingLoading(true);

      // Check username and password uniqueness except current user
      const exists = await checkUsernameAndPasswordExistsExceptCurrentUser(
        formData.id,
        formData.username,
        formData.password
      );

      if (exists === null) {
        toast.error("Error checking username and password uniqueness.");
        setDataUpdatingLoading(false);
        return;
      }

      if (exists) {
        toast.error(
          "The combination of username and password already exists. Please choose different credentials."
        );
        setDataUpdatingLoading(false);
        return;
      }

      if (fileInputRef.current.files.length > 0) {
        const compressedImage = await compressImage({
          image: fileInputRef.current.files[0],
        });
        const res = await uploadFileToCloudinary(compressedImage);
        if (res.error) {
          toast.error("Image upload failed: " + res.error);
          console.log("Image upload error: ", res.error);
          setDataUpdatingLoading(false);
          return;
        }
        formData.profileUrl = res.url;
      }

      await updateDriverDataInFirestore(driverId, formData);
      toast.success("Driver data updated successfully!");
      dispatch(clearDriversData());
      // Navigate back to previous page after adding bus
      navigate(RouteNames.drivers, { replace: true });
    } catch (error) {
      console.error("Error updating bus data: ", error);
      toast.error("Error updating bus data: " + error.message);
    } finally {
      setDataUpdatingLoading(false);
    }
  };

  return (
    <div className="edit-driver mb-8 lg:mb-14">
      <div className="flex flex-row gap-3 items-center">
        <BackButton />
        <Heading text={"Edit Driver Details"} />
      </div>
      <div className="mt-6 bg-white px-8 py-12 rounded-md shadow-md shadow-black/5 flex flex-col gap-6">
        {loading ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <MoonLoader
              color={"var(--color-primary)"}
              loading={true}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="text-textLight text-[14px]">Loading Driver Data...</p>
          </div>
        ) : driverData === null ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <div className="bg-primary p-5 rounded-full w-18 h-18 flex items-center justify-center">
              <img src={Images.driverMenuIcon} alt="Driver Icon" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800">
              No Driver Found
            </h2>
            <p className="text-textLight max-w-xs mt-1 text-sm text-center">
              We couldn't find any driver with the provided ID. Please check the
              ID and try again.
            </p>
          </div>
        ) : (
          <>
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
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="Enter driver name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="driverEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email{" "}
                    <span className="text-textLight text-[13px]">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="email"
                    id="driverEmail"
                    name="driverEmail"
                    value={formData.driverEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter driver email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number <span className="text-red-600">*</span>
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
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

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
                <h1 className="text-[18px] font-bold">
                  Driver Login Credentials
                </h1>
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
                          setFormData({
                            ...formData,
                            password: generatePassword(),
                          })
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <AppButton
                  isSubmitButton={true}
                  text="Update Driver"
                  isLoading={dataUpdatingLoading}
                  loadingText="Updating..."
                />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditDriver;
