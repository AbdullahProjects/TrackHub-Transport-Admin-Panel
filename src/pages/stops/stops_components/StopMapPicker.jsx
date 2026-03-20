import React, { useCallback, useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";

const defaultCenter = { lat: 31.5204, lng: 74.3587 };

const mapContainerStyle = {
  width: "100%",
  height: "420px",
  borderRadius: "8px",
};

const autocompleteFields = ["formatted_address", "geometry", "place_id"];

const StopMapPicker = ({ onLocationSelect, initialLocation }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "trackhub-google-maps",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const initialMarker =
    initialLocation?.latitude != null && initialLocation?.longitude != null
      ? { lat: Number(initialLocation.latitude), lng: Number(initialLocation.longitude) }
      : null;
  const [marker, setMarker] = useState(initialMarker);

  const applyLocation = useCallback(
    (lat, lng, placeId, formattedAddress) => {
      setMarker({ lat, lng });
      onLocationSelect({
        latitude: lat,
        longitude: lng,
        placeId: placeId ?? "",
        formattedAddress: formattedAddress ?? "",
      });
      const map = mapRef.current;
      if (map) {
        map.panTo({ lat, lng });
        map.setZoom(16);
      }
    },
    [onLocationSelect]
  );

  const reverseGeocode = useCallback(
    (lat, lng) => {
      if (!window.google?.maps?.Geocoder) return;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const r = results[0];
          applyLocation(lat, lng, r.place_id ?? "", r.formatted_address ?? "");
        } else {
          applyLocation(lat, lng, "", "");
        }
      });
    },
    [applyLocation]
  );

  const onMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      reverseGeocode(lat, lng);
    },
    [reverseGeocode]
  );

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const onAutocompleteLoad = useCallback((instance) => {
    autocompleteRef.current = instance;
  }, []);

  const onPlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    const loc = place.geometry?.location;
    if (!loc) return;
    const lat = loc.lat();
    const lng = loc.lng();
    applyLocation(lat, lng, place.place_id ?? "", place.formatted_address ?? "");
  }, [applyLocation]);

  if (!apiKey) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Add <code className="rounded bg-amber-100 px-1">VITE_GOOGLE_MAPS_API_KEY</code>{" "}
        to your <code className="rounded bg-amber-100 px-1">.env</code> file and restart
        the dev server. Enable Maps JavaScript API, Places API, and Geocoding API for that
        key.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        Could not load Google Maps. Check your API key and enabled APIs.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600">
        Loading map…
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Search for a place below, or click the map to drop a pin. Address and Place ID fill
        in automatically when possible.
      </p>
      <div className="relative overflow-hidden rounded-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={marker ?? initialMarker ?? defaultCenter}
          zoom={marker ? 16 : 12}
          onClick={onMapClick}
          onLoad={onMapLoad}
          onUnmount={onMapUnmount}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <div className="absolute left-3 top-3 z-10 w-[calc(100%-1.5rem)] max-w-md">
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
              fields={autocompleteFields}
            >
              <input
                type="text"
                placeholder="Search address or place…"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-md outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                autoComplete="off"
              />
            </Autocomplete>
          </div>
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default StopMapPicker;
