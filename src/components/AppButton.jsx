import React from "react";

const AppButton = ({
  text,
  isSubmitButton = false,
  onTap,
  fullWidth = false,
  isLoading = false,
  loadingText = "Loading...",
  isDisabled = false,
}) => {
  return (
    <button
      type={isSubmitButton ? "submit" : "button"}
      onClick={isLoading ? null : onTap}
      disabled={isLoading || isDisabled}
      className={`px-8 py-2.5 rounded-md disabled:bg-gray-400 bg-primary text-white text-[15px] font-medium hover:cursor-pointer hover:bg-primary/90 hover:shadow-md transition-all duration-300 active:ring-2 ring-black/10 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {isLoading ? loadingText : text ? text : "Button"}
    </button>
  );
};

export default AppButton;
