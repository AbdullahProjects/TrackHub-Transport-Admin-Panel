import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBusesData } from "../../../redux_store/slices/buses/BusesSlice";
import { setDriversData } from "../../../redux_store/slices/drivers/DriversSlide";
import { setStopsData } from "../../../redux_store/slices/stops/StopsSlice";
import { getAllBuses } from "../../buses/firebase/BusesFirebase";
import { getAllDrivers } from "../../drivers/firebase/DriversFirebase";
import { getAllStops } from "../../stops/firebase/StopsFirebase";
import { BeatLoader } from "react-spinners";
import BusStatusChart from "./BusStatusChart";
import DriverAllocationChart from "./DriverAllocationChart";
import GrowthChart from "./GrowthChart";
import StopsMapOverview from "./StopsMapOverview";

const DashboardCharts = () => {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.auth.adminData);
  const busesData = useSelector((state) => state.buses.busesData);
  const driversData = useSelector((state) => state.drivers.driversData);
  const stopsData = useSelector((state) => state.stops.stopsData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const orgId = adminData?.organizationId;
    if (!orgId) return;

    const needsBuses = busesData.length === 0;
    const needsDrivers = driversData.length === 0;
    const needsStops = stopsData.length === 0;

    if (!needsBuses && !needsDrivers && !needsStops) return;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const promises = [];

        if (needsBuses) promises.push(getAllBuses(orgId).then((d) => dispatch(setBusesData(d))));
        else promises.push(Promise.resolve());

        if (needsDrivers) promises.push(getAllDrivers(orgId).then((d) => dispatch(setDriversData(d))));
        else promises.push(Promise.resolve());

        if (needsStops) promises.push(getAllStops(orgId).then((d) => dispatch(setStopsData(d))));
        else promises.push(Promise.resolve());

        await Promise.all(promises);
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [adminData?.organizationId]);

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-md bg-white py-16 shadow-md shadow-black/5">
        <BeatLoader color={"var(--color-primary)"} />
        <p className="text-sm text-textLight">Loading charts…</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <BusStatusChart buses={busesData} />
        <DriverAllocationChart buses={busesData} />
      </div>

      <GrowthChart drivers={driversData} buses={busesData} />

      <StopsMapOverview stops={stopsData} />
    </div>
  );
};

export default DashboardCharts;
