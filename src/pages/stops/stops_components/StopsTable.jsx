import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { getAllStops } from "../firebase/StopsFirebase";
import { setStopsData, deleteStop } from "../../../redux_store/slices/stops/StopsSlice";
import DeleteStop from "./DeleteStop";
import ViewStopDetails from "./ViewStopDetails";
import { MdOutlinePlace } from "react-icons/md";

const formatDate = (addedAt) => {
  if (!addedAt) return "—";
  const d = typeof addedAt.toDate === "function" ? addedAt.toDate() : new Date(addedAt);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
};

const StopsTable = () => {
  const adminData = useSelector((state) => state.auth.adminData);
  const stopsData = useSelector((state) => state.stops.stopsData);
  const dispatch = useDispatch();

  const [getStopsLoading, setGetStopsLoading] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [viewDetailData, setViewDetailData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStops = async (reload = false) => {
    if (!adminData?.organizationId) return;
    try {
      if (stopsData.length > 0 && !reload) return;
      setGetStopsLoading(true);
      const list = await getAllStops(adminData.organizationId);
      dispatch(setStopsData(list));
    } catch (error) {
      console.error("Error fetching stops:", error);
      toast.error("Error fetching stops: " + error.message);
    } finally {
      setGetStopsLoading(false);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  const showStopDetails = (data) => {
    setDeleteId(null);
    setViewDetailData(data);
    setViewDetail(true);
  };

  const hideStopDetails = () => {
    setViewDetail(false);
  };

  const showDeleteStop = (id, e) => {
    e?.stopPropagation();
    setViewDetail(false);
    setDeleteId(id);
  };

  const hideDeleteStop = () => {
    setDeleteId(null);
  };

  const handleStopDeleted = () => {
    dispatch(deleteStop(deleteId));
  };

  if (getStopsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-white py-12 shadow-sm shadow-black/5">
        <BeatLoader color={"var(--color-primary)"} />
        <p className="text-[14px] text-textLight">Loading stops…</p>
      </div>
    );
  }

  if (stopsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-white py-12 shadow-sm shadow-black/5">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-white">
          <MdOutlinePlace className="h-9 w-9" />
        </div>
        <h2 className="mt-2 text-xl font-medium text-gray-800">No stops yet</h2>
        <p className="max-w-sm text-center text-sm text-textLight">
          Add stops from the map so each one gets coordinates, address, and Place ID in
          Firestore. You can link these IDs to buses later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="stops-table-container mt-4 overflow-x-auto rounded-md bg-white shadow-sm shadow-black/5">
        <table className="w-full min-w-[720px]">
          <thead className="border-b-2 border-tableDarkBorder">
            <tr className="text-left text-sm">
              <th className="border-r border-tableLightBorder px-2 py-3 font-semibold">
                Stop ID
              </th>
              <th className="border-r border-tableLightBorder px-2 py-3 font-semibold">
                Address
              </th>
              <th className="border-r border-tableLightBorder px-2 py-3 font-semibold">
                Landmark
              </th>
              <th className="border-r border-tableLightBorder px-2 py-3 font-semibold">
                Coordinates (Lat, Lng)
              </th>
              <th className="border-r border-tableLightBorder px-2 py-3 font-semibold">
                Added At
              </th>
              <th className="px-2 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stopsData.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-b border-tableLightBorder text-sm transition-colors hover:bg-gray-50"
                onClick={() => showStopDetails(row)}
              >
                <td className="border-r border-tableLightBorder px-2 py-3 font-mono text-xs text-gray-800">
                  {row.stopId}
                </td>
                <td className="max-w-[220px] border-r border-tableLightBorder px-2 py-3 text-gray-700">
                  <span className="line-clamp-2" title={row.formattedAddress}>
                    {row.formattedAddress || "—"}
                  </span>
                </td>
                <td className="border-r border-tableLightBorder px-2 py-3 text-gray-700">
                  {row.landmark || "—"}
                </td>
                <td className="border-r border-tableLightBorder px-2 py-3 font-mono text-xs text-gray-600">
                  {row.latitude != null && row.longitude != null
                    ? `${Number(row.latitude).toFixed(5)}, ${Number(row.longitude).toFixed(5)}`
                    : "—"}
                </td>
                <td className="whitespace-nowrap border-r border-tableLightBorder px-2 py-3 text-gray-600">
                  {formatDate(row.addedAt)}
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-row gap-2">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="icon cursor-pointer rounded-sm border border-menuActiveColor p-1 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <Link to={`/stops/edit/${row.id}`}>
                        <MdModeEdit />
                      </Link>
                    </div>
                    <div
                      onClick={(e) => showDeleteStop(row.id, e)}
                      className="icon cursor-pointer rounded-sm border border-menuActiveColor p-1 transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white"
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewDetail && !deleteId && (
        <ViewStopDetails
          data={viewDetailData}
          onClose={hideStopDetails}
          onDeleteClick={(id) => {
            hideStopDetails();
            setDeleteId(id);
          }}
        />
      )}

      {deleteId && (
        <DeleteStop
          deleteStopId={deleteId}
          deleteLoading={deleteLoading}
          setDeleteStopLoading={setDeleteLoading}
          onClose={hideDeleteStop}
          onDeleted={handleStopDeleted}
        />
      )}
    </div>
  );
};

export default StopsTable;
