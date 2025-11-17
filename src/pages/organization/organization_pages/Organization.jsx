import React from "react";
import { MdOutlineBusiness } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Heading } from "../../../components/HeadingAndSubheading";
import { useSelector } from "react-redux";
import AppButton from "../../../components/AppButton";
import Images from "../../../utils/common/Images";
import { FaCamera } from "react-icons/fa";

const Organization = () => {
  const organizationData = useSelector(
    (state) => state.organization.organizationData
  );
  const adminData = useSelector((state) => state.auth.adminData);

  return (
    <div>
      <Heading text={"Manage Organization"} />

      <div className="bg-white rounded-md shadow-sm shadow-black/5 px-8 py-10 space-y-10 mt-6">
        {/* Logo and Edit Button */}
        <div className="flex flex-row items-center justify-between">
          <div className="relative">
            <div className="rounded-full border border-primary overflow-hidden w-[130px] h-[130px]">
              <img src={Images.dummyUniImage} alt="University Logo" />
            </div>
            <div className="absolute top-2 -right-2 border border-primary bg-white p-2 rounded-full hover:cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-primary hover:text-white text-primary">
              <FaCamera className=" text-[14px]" />
            </div>
          </div>
          <AppButton text={"Edit Organization Info"}/>
        </div>

        <div className="space-y-6">
          {/* Organization Name */}
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-xl">
              <MdOutlineBusiness className="text-white text-xl" />
            </div>
            <div>
              <p className="text-[13px] text-gray-500">Organization Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {organizationData.name}
              </p>
            </div>
          </div>

          {/* Organization Code */}
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-xl">
              <AiOutlineNumber className="text-white text-xl" />
            </div>
            <div>
              <p className="text-[13px] text-gray-500">Organization Code</p>
              <p className="text-lg font-semibold text-gray-800">
                {organizationData.code}
              </p>
            </div>
          </div>

          {/* Admin Email */}
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-xl">
              <MdEmail className="text-white text-xl" />
            </div>
            <div>
              <p className="text-[13px] text-gray-500">Admin Email</p>
              <p className="text-lg font-semibold text-gray-800">
                {adminData.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization;
