import React from "react";
import Images from "../../utils/common/Images";

const Report = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Report</h1>
      <div className="bg-white mt-4 rounded-md shadow-sm shadow-black/5 px-8 py-10">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="bg-primary p-5 rounded-full w-18 h-18 flex items-center justify-center">
            <img src={Images.reportMenuIcon} alt="Report Icon" />
          </div>
          <h2 className="mt-4 text-xl font-medium text-gray-800">
            No Reports Recorded Yet
          </h2>
          <p className="text-textLight max-w-xs mt-1 text-sm text-center">
            There are currently no reports available. Once reports are
            generated, they will be displayed here for your review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
