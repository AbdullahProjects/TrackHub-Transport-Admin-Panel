import React, { useEffect, useState } from "react";
import { Heading } from "../../../../components/HeadingAndSubheading";
import BackButton from "../../../../components/BackButton";
import Images from "../../../../utils/common/Images";
import AppButton from "../../../../components/AppButton";
import { getBusById } from "../../firebase/BusesFirebase";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { MoonLoader } from "react-spinners";
import { updateBusDataInFirestore } from "../../firebase/BusesFirebase";
import { useDispatch } from "react-redux";
import { clearBusesData } from "../../../../redux_store/slices/buses/BusesSlice";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";

const EditBus = () => {
  const { busId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataUpdatingLoading, setDataUpdatingLoading] = useState(false);
  const [busData, setBusData] = useState(null);

  useEffect(() => {
    const fetchBusDataById = async () => {
      try {
        const data = await getBusById(busId);
        setFormData({
          busName: data.busName,
          licensePlate: data.licensePlate,
          capacity: data.capacity,
          model: data.model,
          year: data.year,
          status: data.status,
        });

        setBusData(data);
      } catch (error) {
        console.error("Error fetching bus data: ", error);
        toast.error("Error fetching bus data: " + error.message);
        setBusData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBusDataById();
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
      await updateBusDataInFirestore(busId, formData);
      toast.success("Bus data updated successfully!");
      dispatch(clearBusesData());
      // Navigate back to previous page after adding bus
      navigate(RouteNames.buses, { replace: true });
    } catch (error) {
      console.error("Error updating bus data: ", error);
      toast.error("Error updating bus data: " + error.message);
    } finally {
      setDataUpdatingLoading(false);
    }
  };

  return (
    <div className="edit-bus mb-8 lg:mb-14">
      <div className="flex flex-row gap-3 items-center">
        <BackButton />
        <Heading text={"Edit Bus Details"} />
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
            <p className="text-textLight text-[14px]">Loading Bus Data...</p>
          </div>
        ) : busData === null ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <div className="bg-primary p-5 rounded-full w-18 h-18 flex items-center justify-center">
              <img src={Images.busMenuIcon} alt="Bus Icon" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800">
              No Bus Found
            </h2>
            <p className="text-textLight max-w-xs mt-1 text-sm text-center">
              The bus you are trying to edit does not exist. Please check the ID
              and try again.
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
              {/* <AppButton
            text="Save Changes"
            onTap={() => console.log("Saved Changes")}
          /> */}
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="busName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bus Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="busName"
                    name="busName"
                    value={formData.busName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter bus name"
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
                    placeholder="Enter license plate"
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
                  text="Update Bus"
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

export default EditBus;
