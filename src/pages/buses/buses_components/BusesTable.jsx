import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import Images from "../../../utils/common/Images";
import { Link } from "react-router";
import ViewBusDetails from "./ViewBusDetails";
import DeleteBus from "./DeleteBus";
import { useSelector } from "react-redux";
import { getAllBuses } from "../firebase/BusesFirebase";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { CiUser } from "react-icons/ci";
import { setBusesData } from "../../../redux_store/slices/buses/BusesSlice";
import { setStopsData } from "../../../redux_store/slices/stops/StopsSlice";
import { getDriverById } from "../../drivers/firebase/DriversFirebase";
import { getAllStops } from "../../stops/firebase/StopsFirebase";
import DriversDialog from "./DriversDialog";

const BusesTable = () => {
  const adminData = useSelector((state) => state.auth.adminData);
  const busesData = useSelector((state) => state.buses.busesData);
  const stopsData = useSelector((state) => state.stops.stopsData);
  const dispatch = useDispatch();

  const [getBusesLoading, setGetBusesLoading] = useState(false);
  const [viewBusDetail, setViewBusDetail] = useState(false);
  const [viewBusDetailData, setViewBusDetailData] = useState(null);
  const [deleteBusId, setDeleteBusId] = useState(null);
  const [deleteBusLoading, setDeleteBusLoading] = useState(false);
  const [deleteBus, setDeleteBus] = useState(false);
  const [busId, setBusId] = useState(null);
  const [showDriversDialog, setShowDriversDialog] = useState(false);

  const handleBusClick = (id) => {
    setBusId(id);
    setShowDriversDialog(true);
  };

  const showBusDetails = (data) => {
    setDeleteBus(false);
    setViewBusDetailData(data);
    setViewBusDetail(true);
  };

  const hideBusDetails = () => {
    setViewBusDetail(false);
  };

  const showDeleteBus = (id) => {
    setViewBusDetail(false);
    setDeleteBusId(id);
    setDeleteBus(true);
  };

  const hideDeleteBus = () => {
    setDeleteBus(false);
  };

  const fetchBuses = async (reload = false) => {
    try {
      if (busesData.length > 0 && !reload) return;
      setGetBusesLoading(true);
      const buses = await getAllBuses(adminData.organizationId);
      dispatch(setBusesData(buses));
    } catch (error) {
      console.error("Error fetching buses: ", error);
      toast.error("Error fetching buses: " + error.message);
    } finally {
      setGetBusesLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    if (stopsData.length === 0 && adminData?.organizationId) {
      getAllStops(adminData.organizationId)
        .then((stops) => dispatch(setStopsData(stops)))
        .catch(() => {});
    }
  }, [adminData?.organizationId, stopsData.length, dispatch]);

  return (
    <div>
      <div className="buses-table-container mt-4 overflow-x-auto rounded-md bg-white shadow-sm shadow-black/5">
        {getBusesLoading ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <BeatLoader color={"var(--color-primary)"} />
            <p className="text-textLight text-[14px]">Getting Buses...</p>
          </div>
        ) : busesData.length === 0 ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <div className="bg-primary p-5 rounded-full w-18 h-18 flex items-center justify-center">
              <img src={Images.busMenuIcon} alt="Bus Icon" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800">
              No Buses Added Yet
            </h2>
            <p className="text-textLight max-w-xs mt-1 text-sm text-center">
              You haven’t added any buses to your organization. Start by adding
              your first bus to begin managing your fleet.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[900px]">
            <thead className="border-b-2 border-tableDarkBorder">
              <tr className="text-left">
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Bus ID
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Bus or Route Name
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Stops
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Allocated Driver
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Status
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Capacity
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  License Plate
                </th>
                <th className="px-2 py-3 text-[14px] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {busesData.map((data, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b border-tableLightBorder transition-colors hover:bg-gray-50"
                  onClick={() => {
                    showBusDetails(data);
                  }}
                >
                  <td className="border-r border-tableLightBorder px-2 pl-5 py-3 font-mono text-[14px]">{data.id}</td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    {data.busName || "N/A"}
                  </td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    {Array.isArray(data.stops) && data.stops.length > 0
                      ? `${data.stops.length} stop${data.stops.length !== 1 ? "s" : ""}`
                      : "—"}
                  </td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    <DriverInfo
                      driverId={
                        data.assignedDriverId ? data.assignedDriverId : null
                      }
                      busClick={(e) => {
                        e.stopPropagation();
                        handleBusClick(data.id);
                      }}
                    />
                  </td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                  </td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">{data.capacity}</td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    {data.licensePlate || "N/A"}
                  </td>
                  <td className="px-2 py-3 text-[14px]">
                    <div className="flex flex-row gap-2">
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white"
                      >
                        <Link to={`/buses/edit/${data.id}`}>
                          <MdModeEdit />
                        </Link>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete bus with ID:", data.id);
                          showDeleteBus(data.id);
                        }}
                        className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white"
                      >
                        <AiFillDelete />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {/* {!getBusesLoading && (
        <div className="table-pagination mt-4 flex flex-row items-center justify-end gap-4">
          <div>
            <label htmlFor="rowsPerPage" className="text-textLight text-[14px]">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              className="rounded-sm px-1 py-1 text-[14px] ml-2 border border-tableDarkBorder"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="ml-2 text-textLight text-[14px]">1-10 of 100</div>
          <div className="flex flex-row gap-1 text-[14px]">
            <button className="rounded-md px-2 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-100">
              <GrPrevious />
            </button>
            <button className="rounded-md px-2 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-1    00">
              <GrPrevious style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </div>
      )}   */}

      {/* View Bus Details Dialog */}
      {viewBusDetail && !deleteBus && (
        <ViewBusDetails
          data={viewBusDetailData}
          onClose={hideBusDetails}
          onDeleteClick={(id) => {
            hideBusDetails();
            setDeleteBusId(id);
            setDeleteBus(true);
          }}
        />
      )}

      {/* Delete Bus Dialog */}
      {deleteBus && !viewBusDetail && (
        <DeleteBus
          deleteBusId={deleteBusId}
          deleteLoading={deleteBusLoading}
          setDeleteBusLoading={setDeleteBusLoading}
          onClose={hideDeleteBus}
        />
      )}

      {/* Show Assigned Driver Dialog */}
      {showDriversDialog && (
        <DriversDialog
          busId={busId}
          onSuccess={fetchBuses}
          onClose={() => setShowDriversDialog(false)}
        />
      )}
    </div>
  );
};

const DriverInfo = ({ driverId, busClick }) => {
  const [gettingDataLoading, setGettingDataLoading] = useState(true);
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const data = await getDriverById(driverId);
        setDriverData(data);
      } catch (e) {
        toast.error("Error while getting driver data");
      } finally {
        setGettingDataLoading(false);
      }
    };

    if (driverId) {
      fetchDriverData();
    } else {
      setGettingDataLoading(false);
    }
  }, []);

  return gettingDataLoading ? (
    <div className="w-20 h-7 rounded-md bg-gray-200 animate-pulse"></div>
  ) : driverData === null ? (
    <div className="flex flex-col items-start">
      <p>No driver assigned</p>
      <div
        onClick={busClick}
        className="text-blue-500 text-[13px] hover:cursor-pointer hover:underline"
      >
        Assign Now
      </div>
    </div>
  ) : (
    <div className="flex flex-row items-start justify-start gap-3">
      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
        {driverData.profileUrl ? (
          <img
            src={driverData.profileUrl}
            alt="Driver Picture"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CiUser className="text-gray-900 text-xl" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-[14px]">{driverData.name}</p>
        <p className="text-[12px] text-textLight">{driverData.phoneNumber}</p>
        <div
          onClick={busClick}
          className="text-blue-500 text-[13px] hover:cursor-pointer hover:underline"
        >
          Update Driver
        </div>
      </div>
    </div>
  );
};

export default BusesTable;
