import React from "react";
import { toast } from "react-toastify";
import { deleteStopFromFirestore } from "../firebase/StopsFirebase";

const DeleteStop = ({
  deleteStopId,
  deleteLoading,
  setDeleteStopLoading,
  onClose,
  onDeleted,
}) => {
  const handleDelete = async () => {
    try {
      setDeleteStopLoading(true);
      await deleteStopFromFirestore(deleteStopId);
      toast.success("Stop deleted successfully");
      onDeleted?.();
    } catch (error) {
      console.error("Error deleting stop: ", error);
      toast.error("Error deleting stop: " + error.message);
    } finally {
      setDeleteStopLoading(false);
      onClose();
    }
  };

  return (
    <div className="delete-stop">
      <div onClick={onClose} className="fixed inset-0 bg-black/20 z-[60]" />
      <div className="fixed top-1/2 left-1/2 z-[70] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-md shadow-black/10">
        <h2 className="mb-4 text-[20px] font-bold">Delete stop</h2>
        <p className="mb-6 text-[15px] text-gray-700">
          Remove this stop from Firestore? Bus route lists that reference this stop ID may
          need to be updated separately.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md px-4 py-2 text-black hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:bg-red-300"
          >
            {deleteLoading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStop;
