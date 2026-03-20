import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePlace, MdLocationOn, MdNotes, MdSchedule } from "react-icons/md";
import { Link } from "react-router";
import RouteNames from "../../../utils/routing/RouteNames";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

const formatDate = (addedAt) => {
  if (!addedAt) return "—";
  const d = typeof addedAt.toDate === "function" ? addedAt.toDate() : new Date(addedAt);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
};

const ViewStopDetails = ({ data, onClose, onDeleteClick }) => {
  const coords =
    data.latitude != null && data.longitude != null
      ? `${Number(data.latitude).toFixed(5)}, ${Number(data.longitude).toFixed(5)}`
      : "—";

  return (
    <div className="view-stop-details">
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl rounded-md bg-white p-6 shadow-xl">
          <div className="mb-3 flex flex-row items-center justify-between border-b border-black/30 pb-2">
            <h2 className="text-2xl font-bold text-gray-800">Stop details</h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-gray-500 transition-all duration-200 hover:text-black"
            >
              <IoMdClose size={26} />
            </button>
          </div>

          <div className="mb-3 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
              <MdOutlinePlace className="h-10 w-10" />
            </div>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <MdLocationOn className="shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Stop ID</p>
                <p className="text-base font-mono">{data.stopId || data.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
              <MdLocationOn className="mt-0.5 shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Landmark</p>
                <p className="text-base">{data.landmark || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
              <MdLocationOn className="mt-0.5 shrink-0 text-lg text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-base">{data.formattedAddress || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <MdLocationOn className="shrink-0 text-lg text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-500">Coordinates</p>
                <p className="text-base font-mono">{coords}</p>
              </div>
            </div>

            {data.placeId && (
              <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
                <MdLocationOn className="shrink-0 text-lg text-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500">Place ID</p>
                  <p className="truncate font-mono text-base">{data.placeId}</p>
                </div>
              </div>
            )}

            {(data.notes || "").trim() && (
              <div className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
                <MdNotes className="mt-0.5 shrink-0 text-lg text-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p className="text-base">{data.notes}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <MdSchedule className="shrink-0 text-lg text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-500">Added</p>
                <p className="text-base">{formatDate(data.addedAt)}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onDeleteClick?.(data.id);
              }}
              className="flex items-center gap-2 rounded-md border border-red-500 px-4 py-2.5 text-base font-medium text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
            >
              <AiFillDelete className="text-lg" />
              Delete
            </button>
            <Link
              to={RouteNames.editStop.replace(":stopId", data.id)}
              onClick={onClose}
              className="flex items-center gap-2 rounded-md border border-menuActiveColor px-4 py-2.5 text-base font-medium transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              <MdModeEdit className="text-lg" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStopDetails;
