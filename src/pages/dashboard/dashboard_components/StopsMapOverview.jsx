import React, { useCallback, useRef, useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "380px",
  borderRadius: "8px",
};

const defaultCenter = { lat: 31.5204, lng: 74.3587 };

const formatDate = (addedAt) => {
  if (!addedAt) return "—";
  const d = typeof addedAt.toDate === "function" ? addedAt.toDate() : new Date(addedAt);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
};

const StopsMapOverview = ({ stops }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "trackhub-google-maps",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const mapRef = useRef(null);
  const [selectedStop, setSelectedStop] = useState(null);

  const validStops = useMemo(
    () =>
      stops.filter((s) => s.latitude != null && s.longitude != null),
    [stops]
  );

  const fitBounds = useCallback(
    (map) => {
      mapRef.current = map;
      if (validStops.length === 0) return;
      const bounds = new google.maps.LatLngBounds();
      validStops.forEach((s) =>
        bounds.extend({ lat: Number(s.latitude), lng: Number(s.longitude) })
      );
      map.fitBounds(bounds, 120);
      google.maps.event.addListenerOnce(map, "idle", () => {
        const zoom = map.getZoom();
        if (zoom > 12) map.setZoom(12);
      });
    },
    [validStops]
  );

  const handleMarkerClick = useCallback((stop) => {
    setSelectedStop(stop);
    const map = mapRef.current;
    if (map) {
      map.panTo({ lat: Number(stop.latitude), lng: Number(stop.longitude) });
      map.setZoom(16);
    }
  }, []);

  if (!apiKey) {
    return (
      <div className="rounded-md bg-white p-5 shadow-md shadow-black/5">
        <h3 className="mb-4 text-base font-semibold text-gray-800">Stops map</h3>
        <div className="flex h-[380px] items-center justify-center rounded-lg border border-amber-200 bg-amber-50 px-4 text-sm text-amber-900">
          Add VITE_GOOGLE_MAPS_API_KEY to .env to see the map.
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="rounded-md bg-white p-5 shadow-md shadow-black/5">
        <h3 className="mb-4 text-base font-semibold text-gray-800">Stops map</h3>
        <div className="flex h-[380px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600">
          Loading map…
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white p-5 shadow-md shadow-black/5">
      <h3 className="mb-4 text-base font-semibold text-gray-800">
        Stops map{" "}
        <span className="text-sm font-normal text-textLight">({validStops.length} stops)</span>
      </h3>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={validStops.length > 0 ? undefined : defaultCenter}
        zoom={validStops.length > 0 ? undefined : 12}
        onLoad={fitBounds}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {validStops.map((stop) => (
          <Marker
            key={stop.id}
            position={{ lat: Number(stop.latitude), lng: Number(stop.longitude) }}
            onClick={() => handleMarkerClick(stop)}
          />
        ))}
        {selectedStop && (
          <InfoWindow
            position={{
              lat: Number(selectedStop.latitude),
              lng: Number(selectedStop.longitude),
            }}
            onCloseClick={() => setSelectedStop(null)}
          >
            <div className="min-w-[200px] max-w-[280px] p-1">
              <p className="font-semibold text-gray-800">{selectedStop.landmark || "Stop"}</p>
              <p className="mt-1 text-sm text-gray-600">
                {selectedStop.formattedAddress || "—"}
              </p>
              <p className="mt-1 font-mono text-xs text-gray-500">
                {selectedStop.stopId || selectedStop.id}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                Added: {formatDate(selectedStop.addedAt)}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default StopsMapOverview;
