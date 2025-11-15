import React from "react";

const AppButton = ({ text, onTap }) => {
  return (
    <div onClick={onTap} className="px-8 py-2.5 rounded-md bg-primary text-white text-[15px] font-medium hover:cursor-pointer hover:bg-primary/90 hover:shadow-md transition-all duration-300 active:ring-2 ring-black/10">
      {text ? text : "Button"}
    </div>
  );
};

export default AppButton;
