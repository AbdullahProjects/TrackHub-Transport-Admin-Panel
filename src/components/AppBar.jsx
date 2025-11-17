import React from "react";
import { IoMdMenu } from "react-icons/io";
import Images from "../utils/common/Images";
import { useSelector } from "react-redux";

const AppBar = ({ onMenuClick }) => {
  const {adminData} = useSelector((state) => state.auth);

  return (
    <div className="h-16 bg-white shadow-md fixed top-0 left-0 lg:left-[155px] w-full lg:w-[90%] z-40 flex items-center justify-between px-4 md:px-8 py-4">
      <div className="flex items-center gap-4">
        {/* Menu icon - visible on mobile and tablet */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer transition-colors"
          aria-label="Toggle menu"
        >
          <IoMdMenu className="text-black text-[25px]" />
        </button>

        {/* Logo/Brand */}
        <img
          src={Images.logo}
          alt="Logo"
          className="w-[110px] h-15 object-contain"
        />
      </div>

      {/* Admin name */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">
          {adminData?.email.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block text-gray-700 font-medium">
          {adminData?.email}
        </span>
      </div>
    </div>
  );
};

export default AppBar;
