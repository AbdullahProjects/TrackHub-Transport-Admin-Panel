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
import { setBusesData } from "../../../redux_store/slices/buses/BusesSlice";

const BusesTable = () => {
  const adminData = useSelector((state) => state.auth.adminData);
  const busesData = useSelector((state) => state.buses.busesData);
  const dispatch = useDispatch();

  // const [busesData, setBusesData] = useState([]);
  const [getBusesLoading, setGetBusesLoading] = useState(false);
  const [viewBusDetail, setViewBusDetail] = useState(false);
  const [viewBusDetailData, setViewBusDetailData] = useState(null);
  const [deleteBusId, setDeleteBusId] = useState(null);
  const [deleteBusLoading, setDeleteBusLoading] = useState(false);
  const [deleteBus, setDeleteBus] = useState(false);

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

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        if (busesData.length > 0) return;
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

    fetchBuses();
  }, []);

  return (
    <div>
      <div className="buses-table-container overflow-x-auto lg:overflow-x-auto bg-white mt-4 rounded-md shadow-sm shadow-black/5">
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
          <table className="w-[150%] lg:w-full">
            <thead className="border-b-2 border-tableDarkBorder">
              <tr className="text-left">
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  Sr.No
                </th>
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  Bus Name
                </th>
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  Driver Info
                </th>
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  Condition
                </th>
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  Seats
                </th>
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  License Plate
                </th>
                <th className="px-2 py-3 text-[14px] border-r border-tableLightBorder">
                  Total Stops
                </th>
                <th className="px-2 py-3 text-[14px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {busesData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-tableLightBorder hover:cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    showBusDetails(data);
                  }}
                >
                  <td className="px-2 pl-5 py-3 text-[14px]">{index + 1}</td>
                  <td className="px-2 py-3 text-[14px]">{data.busName}</td>
                  <td className="px-2 py-3 text-[14px]">Abdullah</td>
                  <td className="px-2 py-3 text-[14px]">
                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                  </td>
                  <td className="px-2 py-3 text-[14px]">{data.capacity}</td>
                  <td className="px-2 py-3 text-[14px]">{data.licensePlate}</td>
                  <td className="px-2 py-3 text-[14px]">0</td>
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
        <ViewBusDetails data={viewBusDetailData} onClose={hideBusDetails} />
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
    </div>
  );
};

export default BusesTable;
