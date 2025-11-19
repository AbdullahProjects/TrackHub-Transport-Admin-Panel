import React, { useEffect, useState } from "react";
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

const EditDriver = () => {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataUpdatingLoading, setDataUpdatingLoading] = useState(false);
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    const fetchDriverDataById = async () => {
      try {
        const data = await getDriverById(driverId);
        setFormData({
          driverName: data.driverName,
          phoneNumber: data.phoneNumber,
          experience: data.experience,
        });

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
    try {
      setDataUpdatingLoading(true);
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
            <div className="flex flex-row justify-between items-center">
              <img
                src={Images.dummyBusImage}
                alt="Bus Image"
                className="w-[110px] h-auto rounded-full"
              />
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="Enter driver name"
                  />
                </div>

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
                    placeholder="Enter phone number"
                  />
                </div>

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
                    placeholder="Enter experience"
                  />
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
