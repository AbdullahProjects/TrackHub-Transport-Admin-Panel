import React, { useState, useEffect } from "react";
import BackButton from "../../../../components/BackButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import Images from "../../../../utils/common/Images";
import AppButton from "../../../../components/AppButton";
import { addBus } from "../../firebase/BusesFirebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearBusesData } from "../../../../redux_store/slices/buses/BusesSlice";
import RouteNames from "../../../../utils/routing/RouteNames";
import { getAllStops } from "../../../stops/firebase/StopsFirebase";
import { MdOutlinePlace, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const AddBus = () => {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.auth.adminData);
  const stopsData = useSelector((state) => state.stops.stopsData);

  const navigate = useNavigate();
  const [addingBusLoading, setAddingBusLoading] = useState(false);
  const [stopsLoading, setStopsLoading] = useState(false);
  const [stops, setStops] = useState([]);
  const [stopsList, setStopsList] = useState([]);
  const [selectedStopId, setSelectedStopId] = useState("");

  const [formData, setFormData] = useState({
    busName: "",
    licensePlate: "",
    capacity: "",
    model: "",
    year: "",
    status: "active",
    organizationId: adminData.organizationId,
    adminId: adminData.id,
  });

  useEffect(() => {
    const loadStops = async () => {
      try {
        setStopsLoading(true);
        const list = stopsData.length > 0
          ? stopsData
          : await getAllStops(adminData.organizationId);
        setStops(list);
      } catch (e) {
        toast.error("Error loading stops: " + e.message);
      } finally {
        setStopsLoading(false);
      }
    };
    if (adminData?.organizationId) loadStops();
  }, [adminData?.organizationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addStop = () => {
    if (!selectedStopId) return;
    if (stopsList.includes(selectedStopId)) {
      toast.error("Stop already in the list.");
      return;
    }
    setStopsList((prev) => [...prev, selectedStopId]);
    setSelectedStopId("");
  };

  const removeStop = (index) => {
    setStopsList((prev) => prev.filter((_, i) => i !== index));
  };

  const moveStopUp = (index) => {
    if (index <= 0) return;
    setStopsList((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveStopDown = (index) => {
    if (index >= stopsList.length - 1) return;
    setStopsList((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const getStopLabel = (stopId) => {
    const s = stops.find((x) => x.id === stopId);
    return s ? s.landmark || s.formattedAddress || s.stopId || s.id : stopId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stopsList.length === 0) {
      toast.error("Add at least one stop to the route.");
      return;
    }
    try {
      setAddingBusLoading(true);
      await addBus({ ...formData, stops: stopsList });
      toast.success("Bus added successfully!");
      dispatch(clearBusesData());
      navigate(RouteNames.buses, { replace: true });
    } catch (error) {
      toast.error("Error adding bus: " + error.message);
    } finally {
      setAddingBusLoading(false);
    }
  };

  return (
    <div className="add-bus mb-8 lg:mb-14">
      <div className="flex flex-row gap-3 items-center">
        <BackButton />
        <Heading text={"Add Bus Details"} />
      </div>
      <div className="mt-6 bg-white px-8 py-10 rounded-md shadow-md shadow-black/5 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="busName" className="block text-sm font-medium text-gray-700 mb-2">
                Bus or Route Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="busName"
                name="busName"
                value={formData.busName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Route no 01"
              />
            </div>

            <div>
              <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-2">
                License Plate
              </label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. ABC-1234"
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
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
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
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
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
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

          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-3 text-base font-semibold text-gray-800">Route stops</h3>
            <p className="mb-4 text-sm text-textLight">
              Add stops in the order the bus visits them. Use the arrows to reorder.
            </p>
            <div className="flex flex-row gap-2">
              <select
                value={selectedStopId}
                onChange={(e) => setSelectedStopId(e.target.value)}
                disabled={stopsLoading}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
              >
                <option value="">
                  {stopsLoading ? "Loading stops…" : "Select a stop to add"}
                </option>
                {stops
                  .filter((s) => !stopsList.includes(s.id))
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.landmark || s.formattedAddress || s.stopId || s.id}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={addStop}
                disabled={!selectedStopId || stopsLoading}
                className="rounded-lg border border-menuActiveColor bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            {stops.length === 0 && !stopsLoading && (
              <p className="mt-2 text-xs text-textLight">
                Add stops first from the Stops page.
              </p>
            )}
            {stopsList.length > 0 && (
              <ul className="mt-4 space-y-2">
                {stopsList.map((stopId, index) => (
                  <li
                    key={stopId}
                    className="flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-gray-500">{index + 1}.</span>
                      <MdOutlinePlace className="h-4 w-4 text-primary" />
                      {getStopLabel(stopId)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStopUp(index)}
                        disabled={index === 0}
                        aria-label="Move up"
                        className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-menuActiveColor disabled:hover:text-inherit"
                      >
                        <MdKeyboardArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStopDown(index)}
                        disabled={index === stopsList.length - 1}
                        aria-label="Move down"
                        className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-menuActiveColor disabled:hover:text-inherit"
                      >
                        <MdKeyboardArrowDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStop(index)}
                        aria-label="Remove stop"
                        className="icon border border-menuActiveColor rounded-sm p-1 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white"
                      >
                        <AiFillDelete className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4">
            <AppButton
              isSubmitButton
              text="Add Bus"
              isLoading={addingBusLoading}
              loadingText="Adding..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBus;
