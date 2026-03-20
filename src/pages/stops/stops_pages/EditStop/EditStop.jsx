import React, { useState, useCallback, useEffect } from "react";
import BackButton from "../../../../components/BackButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import AppButton from "../../../../components/AppButton";
import StopMapPicker from "../../stops_components/StopMapPicker";
import { getStopById, updateStopInFirestore } from "../../firebase/StopsFirebase";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import RouteNames from "../../../../utils/routing/RouteNames";
import { clearStopsData } from "../../../../redux_store/slices/stops/StopsSlice";
import { BeatLoader } from "react-spinners";

const EditStop = () => {
  const { stopId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    placeId: "",
    formattedAddress: "",
  });
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");

  const onLocationSelect = useCallback((payload) => {
    setLocation(payload);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getStopById(stopId);
        if (!data) {
          toast.error("Stop not found");
          navigate(RouteNames.stops);
          return;
        }
        setLocation({
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          placeId: data.placeId ?? "",
          formattedAddress: data.formattedAddress ?? "",
        });
        setLandmark(data.landmark ?? "");
        setNotes(data.notes ?? "");
      } catch (error) {
        toast.error("Error loading stop: " + error.message);
        navigate(RouteNames.stops);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [stopId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.latitude == null || location.longitude == null) {
      toast.error("Click the map or search to choose a stop location.");
      return;
    }
    if (!landmark.trim()) {
      toast.error("Landmark is required.");
      return;
    }
    try {
      setSaving(true);
      await updateStopInFirestore(stopId, {
        latitude: location.latitude,
        longitude: location.longitude,
        placeId: location.placeId || "",
        formattedAddress: location.formattedAddress || "",
        landmark: landmark.trim(),
        notes: notes.trim(),
      });
      toast.success("Stop updated");
      dispatch(clearStopsData());
      navigate(RouteNames.stops, { replace: true });
    } catch (error) {
      toast.error("Error updating stop: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <BeatLoader color={"var(--color-primary)"} />
        <p className="text-sm text-textLight">Loading stop…</p>
      </div>
    );
  }

  return (
    <div className="edit-stop mb-8 lg:mb-14">
      <div className="flex flex-row items-center gap-3">
        <BackButton />
        <Heading text={"Edit stop"} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-8 rounded-md bg-white px-6 py-8 shadow-md shadow-black/5 lg:px-8"
      >
        <section>
          <h3 className="mb-1 text-base font-bold text-gray-800">1. Pick on map</h3>
          <StopMapPicker
            onLocationSelect={onLocationSelect}
            initialLocation={
              location.latitude != null && location.longitude != null
                ? location
                : undefined
            }
          />
        </section>

        <section className="space-y-4">
          <h3 className="text-md font-bold text-gray-800">2. Location (auto)</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                readOnly
                value={location.latitude ?? ""}
                placeholder="—"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                readOnly
                value={location.longitude ?? ""}
                placeholder="—"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Place ID
              </label>
              <input
                readOnly
                value={location.placeId}
                placeholder="—"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 font-mono text-xs outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Formatted address
              </label>
              <textarea
                readOnly
                rows={2}
                value={location.formattedAddress}
                placeholder="Click the map — address appears after geocoding"
                className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-md font-bold text-gray-800">3. Details (you)</h3>
          <div>
            <label
              htmlFor="landmark"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Landmark <span className="text-red-600">*</span>
            </label>
            <input
              id="landmark"
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
              placeholder="e.g. Near McDonald's"
            />
          </div>
          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-700">
              Notes <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
              placeholder="e.g. Wait near the security post"
            />
          </div>
        </section>

        <div className="flex justify-end border-t border-gray-100 pt-4">
          <AppButton
            isSubmitButton
            text="Update stop"
            isLoading={saving}
            loadingText="Updating…"
          />
        </div>
      </form>
    </div>
  );
};

export default EditStop;
