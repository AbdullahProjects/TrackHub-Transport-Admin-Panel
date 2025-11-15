import React from "react";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-200 rounded-full p-2 w-7 h-7 flex items-center justify-center hover:cursor-pointer hover:bg-gray-300" onClick={handleBackClick}>
      <GrPrevious className="text-black"/>
    </div>
  );
};

export default BackButton;
