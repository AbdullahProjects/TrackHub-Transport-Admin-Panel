import React, { useState } from "react";
import AppButton from "../../../../components/AppButton";
import { Heading } from "../../../../components/HeadingAndSubheading";
import StopsTable from "../../stops_components/StopsTable";
import { useNavigate } from "react-router";
import RouteNames from "../../../../utils/routing/RouteNames";
import { IoSearch } from "react-icons/io5";

const Stops = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="stops mb-25 lg:mb-14">
      <div className="mt-2 flex flex-row items-center justify-between gap-4">
        <Heading text={"Stop points"} />
        <AppButton
          text={"Add stop"}
          onTap={() => navigate(RouteNames.addStop)}
        />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-textLight">
        Each stop is saved on its own in Firestore. Use the map to capture
        location; buses can reference these stop IDs in their routes later.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-lg px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          placeholder="Search by landmark…"
        />
      </div>
      <div className="mt-6">
        <StopsTable searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Stops;
