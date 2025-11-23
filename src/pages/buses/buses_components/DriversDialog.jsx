import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllDrivers } from "../../drivers/firebase/DriversFirebase";
import { useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";
import { setDriversData } from "../../../redux_store/slices/drivers/DriversSlide";
import Images from "../../../utils/common/Images";
import { CiUser } from "react-icons/ci";
import AppButton from "../../../components/AppButton";
import { FaCircleCheck } from "react-icons/fa6";
import { assignDriverToBus } from "../firebase/BusesFirebase";

const DriversDialog = ({ busId, onSuccess, onClose }) => {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers.driversData);
  const adminData = useSelector((state) => state.auth.adminData);
  const [loading, setLoading] = useState(false);
  const [assigningLoading, setAssigningLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const data = await getAllDrivers(adminData.organizationId);
        dispatch(setDriversData(data));
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (driversData.length === 0) {
      fetchDrivers();
    }
  }, []);

  const assignDriver = async () => {
    try {
      setAssigningLoading(true);
      await assignDriverToBus(busId, selectedDriver);
      toast.success("Driver assigned successfully.");
      onClose();
      await onSuccess(true);
    } catch (e) {
      toast.error(e);
    } finally {
      setAssigningLoading(false);
    }
  };

  return (
    <div className="view-bus-details">
      <div onClick={onClose} className="fixed inset-0 bg-black/20"></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 lg:-translate-x-1/3 -translate-y-1/2 bg-white p-6 rounded-md shadow-md shadow-black/10 w-[80%] lg:w-[30%]">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Select Driver</h2>
          <IoMdClose
            onClick={onClose}
            className="text-[22px] hover:cursor-pointer"
          />
        </div>
        <div className="space-y-2 mt-5">
          {loading ? (
            <div className="flex items-center w-full justify-center py-6">
              <MoonLoader
                color={"var(--color-primary)"}
                loading={true}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : driversData.length === 0 ? (
            <div className="flex flex-col gap-3 py-8 justify-center items-center">
              <div className="bg-primary p-5 rounded-full w-18 h-18 flex items-center justify-center">
                <img src={Images.driverMenuIcon} alt="Driver Icon" />
              </div>
              <h2 className="mt-2 text-xl font-medium text-gray-800">
                No Drivers Added Yet
              </h2>
              <p className="text-textLight max-w-xs text-sm text-center">
                You haven’t added any driver to your organization. Before
                assigning drivers, please first add driver.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                {driversData.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedDriver(data.id);
                    }}
                  >
                    <div
                      className={`w-full flex flex-row items-center gap-3 bg-gray-50 py-3 px-4 border rounded-md hover:cursor-pointer hover:bg-gray-100 ${
                        data.id === selectedDriver
                          ? "border-green-600"
                          : "border-transparent"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        {data.profileUrl ? (
                          <img
                            src={data.profileUrl}
                            alt="Driver Picture"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center ">
                            <CiUser className="text-gray-900 text-xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="text-[14px]">{data.driverName}</p>
                        <p className="text-[12px] text-textLight">
                          {data.phoneNumber}
                        </p>
                      </div>
                      {selectedDriver === data.id && (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <FaCircleCheck className="text-green-600" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 w-full">
                <AppButton
                  text={"Assign"}
                  isLoading={assigningLoading}
                  loadingText="Assigning..."
                  fullWidth={true}
                  onTap={() => {
                    assignDriver();
                  }}
                  isDisabled={selectedDriver === null}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriversDialog;
