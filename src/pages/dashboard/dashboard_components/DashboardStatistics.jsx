import React, { useEffect, useState } from "react";
import Images from "../../../utils/common/Images";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FirebaseCollections from "../../../utils/common/FirebaseCollectionNames";
import { useDispatch, useSelector } from "react-redux";
import { setStatsData } from "../../../redux_store/slices/dashboard/DashboardStatsSlice";

// Method to load stats data from Firebase Firestore
const getAllStats = async () => {
  try {
    const totalDrivers = await getCountFromServer(
      collection(db, FirebaseCollections.usersCollection)
    );
    const totalBuses = await getCountFromServer(
      collection(db, FirebaseCollections.busesCollection)
    );
    const totalStudents = await getCountFromServer(
      collection(db, FirebaseCollections.usersCollection)
    );
    const totalReports = await getCountFromServer(
      collection(db, FirebaseCollections.reportsCollection)
    );

    return {
      drivers: totalDrivers.data().count,
      buses: totalBuses.data().count,
      students: totalStudents.data().count,
      reports: totalReports.data().count,
    };
  } catch (err) {
    throw new Error("Failed to load stats: " + err.message);
  }
};

// Component
const DashboardStatistics = () => {
  const [loading, setLoading] = useState(false);
  const stats = useSelector((state) => state.dashboardStatsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    // If data not fetched before, then get data otherwise load from cached
    if (
      stats.drivers !== null &&
      stats.buses !== null &&
      stats.students !== null &&
      stats.reports !== null
    ) {
      return;
    }

    const loadsData = async () => {
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

    loadsData();
  }, []);

  return (
    <div className="dashboard-statistics">
      <div className="grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 gap-4">
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
          text={"Enrolled Students"}
          value={stats.students}
          icon={Images.educationCapIcon}
          loading={loading}
        />
        <StatsContainer
          text={"Reports"}
          value={stats.reports}
          icon={Images.reportIcon}
          loading={loading}
        />
      </div>
    </div>
  );
};

const StatsContainer = (props) => {
  return (
    <div className="single-stats-container bg-white shadow-md shadow-black/5 rounded-md flex flex-row px-4 py-5">
      <div className="col1 w-full flex flex-col gap-1">
        {props.loading !== true ? (
          <>
            <h1 className="font-bold text-[28px] text-black">{props.value}</h1>
            <p className="text-[14px] text-textLight">
              {props.text ? props.text : 0}
            </p>
          </>
        ) : (
          <Shimmer />
        )}
      </div>
      <div className="col2 px-3 py-2 bg-[#BFDEFF] rounded-md flex justify-center items-center self-center">
        <img src={props.icon} alt="Icon" className="w-6 h-6" />
      </div>
    </div>
  );
};

const Shimmer = () => (
  <div className="flex flex-col gap-3 animate-pulse w-full">
    <div className="h-8 w-16 bg-gray-100 rounded-md"></div>
    <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
  </div>
);

export default DashboardStatistics;
