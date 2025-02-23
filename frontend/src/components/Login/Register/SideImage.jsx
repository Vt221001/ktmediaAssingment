import React from "react";
import jobImg from "../../../assets/asssingImg.png";

function SideImage({img, height, title}) {
  return (
    <>
      <img
        src={img || jobImg} 
        alt="Job Finder"
        className={`w-full  ${height ? height :"h-screen"} object-fill`}
      />
      <div className="absolute flex justify-center pt-8 px-6 inset-0 bg-transparent">
        <h2 className="text-lg md:text-2xl text-white font-semibold ">
          {
            title || "Your Personal Job Finder"
          }
        </h2>
      </div>
    </>
  );
}

export default SideImage;
