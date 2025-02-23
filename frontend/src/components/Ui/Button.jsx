import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-red-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2  h-8 flex justify-center items-center rounded-sm ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
