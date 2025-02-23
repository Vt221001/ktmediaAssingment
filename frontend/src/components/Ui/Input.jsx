import React, { useId } from "react";

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      className = "",
      labelClassName = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            className={`inline-block mb-1 pl-1 ${labelClassName}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
