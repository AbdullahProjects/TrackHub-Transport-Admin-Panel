import React, { useEffect, useState } from "react";
import Images from "../../../utils/common/Images";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";
import { useDispatch, useSelector } from "react-redux";
import { setStatsData } from "../../../redux_store/slices/dashboard/DashboardStatsSlice";
import { MdOutlinePlace } from "react-icons/md";

const getAllStats = async () => {
  try {
    const [totalDrivers, totalBuses, totalStops] = await Promise.all([
      getCountFromServer(collection(db, FirebaseCollections.usersCollection)),
      getCountFromServer(collection(db, FirebaseCollections.busesCollection)),
      getCountFromServer(collection(db, FirebaseCollections.stopsCollection)),
    ]);

    return {
      drivers: totalDrivers.data().count,
      buses: totalBuses.data().count,
      stops: totalStops.data().count,
    };
  } catch (err) {
    throw new Error("Failed to load stats: " + err.message);
  }
};

const DashboardStatistics = () => {
  const [loading, setLoading] = useState(false);
  const stats = useSelector((state) => state.dashboardStatsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllStats();
        dispatch(setStatsData(data));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-statistics">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsContainer
          text={"Total Drivers"}
          value={stats.drivers}
          icon={Images.driverIcon}
          loading={loading}
        />
        <StatsContainer
          text={"Total Buses"}
          value={stats.buses}
          icon={Images.busIcon}
          loading={loading}
        />
        <StatsContainer
          text={"Total Stops"}
          value={stats.stops}
          loading={loading}
          reactIcon={<MdOutlinePlace className="h-6 w-6 text-primary" />}
        />
      </div>
    </div>
  );
};

export default DashboardStatistics;

const StatsContainer = (props) => {
  return (
    <div className="single-stats-container flex flex-row rounded-md bg-white px-4 py-5 shadow-md shadow-black/5">
      <div className="col1 flex w-full flex-col gap-1">
        {props.loading !== true ? (
          <h1 className="text-[28px] font-bold text-black">{props.value}</h1>
        ) : (
          <Shimmer />
        )}
        <p className="text-[14px] text-textLight">{props.text ?? 0}</p>
      </div>
      <div className="col2 flex items-center justify-center self-center rounded-md bg-[#BFDEFF] px-3 py-2.5">
        {props.reactIcon ? (
          props.reactIcon
        ) : (
          <img src={props.icon} alt="Icon" className="h-6 w-6 object-contain" />
        )}
      </div>
    </div>
  );
};

const Shimmer = () => (
  <div className="mb-2 w-full animate-pulse">
    <div className="h-7 w-15 rounded-md bg-gray-200"></div>
  </div>
);
