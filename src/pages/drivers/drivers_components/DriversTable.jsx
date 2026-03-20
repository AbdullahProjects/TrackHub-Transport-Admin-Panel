import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import Images from "../../../utils/common/Images";
import { Link } from "react-router";
import DeleteDriver from "./DeleteDriver";
import { useSelector } from "react-redux";
import { getAllDrivers } from "../firebase/DriversFirebase";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setDriversData } from "../../../redux_store/slices/drivers/DriversSlide";
import ViewDriverDetails from "./ViewDriverDetails";
import { CiUser } from "react-icons/ci";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const DriversTable = ({ searchTerm = "" }) => {
  const adminData = useSelector((state) => state.auth.adminData);
  const driversData = useSelector((state) => state.drivers.driversData);
  const dispatch = useDispatch();

  const filteredDrivers = React.useMemo(() => {
    if (!searchTerm.trim()) return driversData;
    const q = searchTerm.trim().toLowerCase();
    return driversData.filter((d) => (d.name || "").toLowerCase().includes(q));
  }, [driversData, searchTerm]);

  // const [busesData, setBusesData] = useState([]);
  const [getDriversLoading, setGetDriversLoading] = useState(false);
  const [viewDriverDetail, setViewDriverDetail] = useState(false);
  const [viewDriverDetailData, setViewDriverDetailData] = useState(null);
  const [deleteDriverId, setDeleteDriverId] = useState(null);
  const [deleteDriverLoading, setDeleteDriverLoading] = useState(false);
  const [deleteDriver, setDeleteDriver] = useState(false);

  const showDriverDetails = (data) => {
    setDeleteDriver(false);
    setViewDriverDetailData(data);
    setViewDriverDetail(true);
  };

  const hideDriverDetails = () => {
    setViewDriverDetail(false);
  };

  const showDeleteDriver = (id) => {
    setViewDriverDetail(false);
    setDeleteDriverId(id);
    setDeleteDriver(true);
  };

  const hideDeleteDriver = () => {
    setDeleteDriver(false);
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        if (driversData.length > 0) return;
        setGetDriversLoading(true);
        const drivers = await getAllDrivers(adminData.organizationId);
        dispatch(setDriversData(drivers));
      } catch (error) {
        console.error("Error fetching buses: ", error);
        toast.error("Error fetching buses: " + error.message);
      } finally {
        setGetDriversLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      <div className="drivers-table-container mt-4 overflow-x-auto rounded-md bg-white shadow-sm shadow-black/5">
        {getDriversLoading ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <BeatLoader color={"var(--color-primary)"} />
            <p className="text-textLight text-[14px]">Getting Drivers...</p>
          </div>
        ) : driversData.length === 0 ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <div className="bg-primary p-5 rounded-full w-18 h-18 flex items-center justify-center">
              <img src={Images.driverMenuIcon} alt="Driver Icon" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800">
              No Drivers Added Yet
            </h2>
            <p className="text-textLight max-w-xs mt-1 text-sm text-center">
              You haven’t added any drivers to your organization. Start by
              adding your first driver to begin managing your fleet.
            </p>
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="flex flex-col gap-3 py-12 justify-center items-center">
            <p className="text-textLight text-sm">No drivers match your search.</p>
          </div>
        ) : (
          <table className="w-full min-w-[720px]">
            <thead className="border-b-2 border-tableDarkBorder">
              <tr className="text-left">
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Driver ID
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Driver Name
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Login Credentials
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Email
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Phone Number
                </th>
                <th className="border-r border-tableLightBorder px-2 py-3 text-[14px] font-semibold">
                  Joining Date
                </th>
                <th className="px-2 py-3 text-[14px] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((data, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b border-tableLightBorder transition-colors hover:bg-gray-50"
                  onClick={() => {
                    showDriverDetails(data);
                  }}
                >
                  <td className="border-r border-tableLightBorder font-mono px-2 pl-5 py-3 text-[14px]">{data.id}</td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    <div className="flex flex-row items-center justify-start gap-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
                        {data.profileUrl !== null ? (
                          <img
                            src={data.profileUrl}
                            alt="Driver Picture"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <CiUser className="text-gray-900 text-xl" />
                          </div>
                        )}
                      </div>
                      <p>{data.name}</p>
                    </div>
                  </td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    <LoginCredentialsData data={data} />
                  </td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    {data.email || "N/A"}
                  </td>
                  <td className="border-r border-tableLightBorder font-mono px-2 py-3 text-[14px]">{data.phoneNumber}</td>
                  <td className="border-r border-tableLightBorder px-2 py-3 text-[14px]">
                    {data.registeredDate}
                  </td>
                  <td className="px-2 py-3 text-[14px]">
                    <div className="flex flex-row gap-2">
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white"
                      >
                        <Link to={`/drivers/edit/${data.id}`}>
                          <MdModeEdit />
                        </Link>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete driver with ID:", data.id);
                          showDeleteDriver(data.id);
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

      {/* View Driver Details Dialog */}
      {viewDriverDetail && !deleteDriver && (
        <ViewDriverDetails
          data={viewDriverDetailData}
          onClose={hideDriverDetails}
          onDeleteClick={(id) => {
            hideDriverDetails();
            setDeleteDriverId(id);
            setDeleteDriver(true);
          }}
        />
      )}

      {/* Delete Driver Dialog */}
      {deleteDriver && !viewDriverDetail && (
        <DeleteDriver
          deleteDriverId={deleteDriverId}
          deleteLoading={deleteDriverLoading}
          setDeleteDriverLoading={setDeleteDriverLoading}
          onClose={hideDeleteDriver}
        />
      )}
    </div>
  );
};

const LoginCredentialsData = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibilityToggle = (e) => {
    e.stopPropagation();
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <p className="text-[14px]">{props.data.username}</p>
      <div className="flex flex-row items-center gap-2">
        <p className="text-[14px] font-medium">
          {passwordVisible ? props.data.password : "******"}
        </p>
        {!passwordVisible ? (
          <GoEyeClosed onClick={handlePasswordVisibilityToggle} />
        ) : (
          <GoEye
            onClick={handlePasswordVisibilityToggle}
            className="text-primary"
          />
        )}
      </div>
    </div>
  );
};

export default DriversTable;
