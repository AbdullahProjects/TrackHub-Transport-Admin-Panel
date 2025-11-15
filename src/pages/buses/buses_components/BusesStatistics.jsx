import React, {useState} from "react";
import Images from "../../../utils/common/Images";

const BusesStatistics = () => {
  const [statsLoading, setStatsLoading] = useState(false);

  return (
    <div className="bus-stats grid grid-rows-3 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-1 lg:grid-cols-3 gap-4">
      <StatsContainer
        text={"Total Buses"}
        value={18}
        icon={Images.busIcon}
        loading={statsLoading}
      />
      <StatsContainer
        text={"Active Buses"}
        value={15}
        icon={Images.activeBusIcon}
        loading={statsLoading}
        bgColor="#32B35950"
      />
      <StatsContainer
        text={"Maintenance Required"}
        value={2}
        icon={Images.maintenanceIcon}
        loading={statsLoading}
        bgColor="#ED1F3E50"
      />
    </div>
  );
};

export default BusesStatistics;

// Helper Components
const StatsContainer = (props) => {
  const bgColor = props.bgColor || "#BFDEFF";
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
      <div
        className="col2 px-3 py-2.5 rounded-md flex justify-center items-center self-center"
        style={{ backgroundColor: bgColor }}
      >
        <img src={props.icon} alt="Icon" className="w-6 h-6 object-contain" />
      </div>
    </div>
  );
};

const Shimmer = () => (
  <div className="flex flex-col gap-3 animate-pulse w-full">
    <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
    <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
  </div>
);
