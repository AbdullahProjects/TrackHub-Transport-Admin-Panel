import React from "react";
import { toast } from "react-toastify";
import { deleteDriverFromFirestore } from "../firebase/DriversFirebase";
import { clearDriverFromBuses } from "../../buses/firebase/BusesFirebase";
import { useDispatch } from "react-redux";
import { deleteDriver } from "../../../redux_store/slices/drivers/DriversSlide";
import { clearDriverFromBusesData } from "../../../redux_store/slices/buses/BusesSlice";

const DeleteDriver = ({
  deleteDriverId,
  deleteLoading,
  setDeleteDriverLoading,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleDeleteDriver = async () => {
    try {
      setDeleteDriverLoading(true);
      await Promise.all([
        deleteDriverFromFirestore(deleteDriverId),
        clearDriverFromBuses(deleteDriverId),
      ]);
      dispatch(deleteDriver(deleteDriverId));
      dispatch(clearDriverFromBusesData(deleteDriverId));
      toast.success("Driver deleted successfully");
    } catch (error) {
      console.error("Error deleting driver: ", error);
      toast.error("Error deleting driver: " + error.message);
    } finally {
      setDeleteDriverLoading(false);
      onClose();
    }
  };

  return (
    <div className="delete-driver">
      <div onClick={onClose} className="fixed inset-0 bg-black/20"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 bg-white p-6 rounded-md shadow-md shadow-black/10 w-[40%]">
        <h2 className="text-[20px] font-bold mb-4">Delete Driver</h2>
        <p className="mb-6 text-[15px]">
          Are you sure you want to delete this driver? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-black hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteDriver}
            disabled={deleteLoading}
            className="px-4 py-2 rounded-md disabled:bg-red-300 bg-red-600 text-white hover:bg-red-700 transition-colors hover:cursor-pointer"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDriver;
