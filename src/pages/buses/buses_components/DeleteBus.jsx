import React from "react";
import { toast } from "react-toastify";
import { deleteBusFromFirestore } from "../firebase/BusesFirebase";
import { useDispatch } from "react-redux";
import { deleteBus } from "../../../redux_store/slices/buses/BusesSlice";

const DeleteBus = ({
  deleteBusId,
  deleteLoading,
  setDeleteBusLoading,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleDeleteBus = async () => {
    try {
      console.log("Deleting bus with ID:", deleteBusId);
      setDeleteBusLoading(true);
      await deleteBusFromFirestore(deleteBusId);
      dispatch(deleteBus(deleteBusId));
      toast.success("Bus deleted successfully");
    } catch (error) { 
      console.error("Error deleting bus: ", error);
      toast.error("Error deleting bus: " + error.message);
    } finally {
      setDeleteBusLoading(false);
      onClose();
    }
  };

  return (
    <div className="delete-bus">
      <div onClick={onClose} className="fixed inset-0 bg-black/20"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 bg-white p-6 rounded-md shadow-md shadow-black/10 w-[40%]">
        <h2 className="text-[20px] font-bold mb-4">Delete Bus</h2>
        <p className="mb-6 text-[15px]">
          Are you sure you want to delete this bus? This action cannot be
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
            onClick={handleDeleteBus}
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

export default DeleteBus;
