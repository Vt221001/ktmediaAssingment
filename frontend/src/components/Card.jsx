import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import Button from "./Ui/Button";
import { FaUserGroup } from "react-icons/fa6";

const Card = ({ job }) => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  return (
    <div className="w-full max-w-4xl mt-10 bg-white shadow-[0_0_12px_3px_rgba(0,0,0,0.2)] border-none rounded-none p-4 flex flex-col md:flex-row justify-between shadow-red-200 mx-auto">
      {/* Left Section: Logo, Job Details & Edit Button */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Company Logo */}
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHtXcqWc-MXaTK9yFKaPpEtHcDOyVJKahUlA&s"
          }
          alt={job?.companyName || "Company"}
          className="w-10 h-10 mt-2 "
        />

        {/* Job Info */}
        <div className="text-center md:text-left">
          {/* Job Title */}
          <h3 className="text-lg mb-1 font-semibold">
            {job?.companyName || "N/A"}
          </h3>

          {/* Employee Count - Salary - Location */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-400">
            <span className="flex justify-center font-semibold items-center gap-1">
              <FaUserGroup /> {job?.employees || "20+"}
            </span>
            <span className="font-semibold text-gray-400">
              ₹{" "}
              {job?.monthlySalary
                ? job.monthlySalary.toLocaleString("en-IN")
                : "N/A"}
            </span>
            <span className="flex font-semibold items-center gap-1">
              <div className="rounded-sm  h-4 bg-gray-200 overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                  alt="India"
                  className="w-6 h-4 object-cover"
                />
              </div>
              {job?.companyLocation || "Unknown"}
            </span>
          </div>

          {/* Work Type & Job Type */}
          <div className="text-xs flex gap-6 text-red-500 font-semibold mt-3">
            <span >{job?.jobLocation || "N/A"}</span>
            <span >
              {job?.jobType || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Skills, Buttons */}
      <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-end">
          {(Array.isArray(job?.skillRequired) && job?.skillRequired.length > 0
            ? job?.skillRequired
            : ["No skills listed"]
          ).map((skill, index) => (
            <span
              key={index}
              className="bg-[#FFEEEE] text-black text-xs px-3 py-1 rounded-none font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          {/* Conditionally Render "Edit Job" Button if User is Logged In */}
          {userId && (
            <Button
              bgColor=""
              className="h-8 border-2 border-[#ED5353] text-[#ED5353]"
              textColor="text-[#ED5353]"
              onClick={() => navigate(`/edit-job/${job._id}`)}
            >
              Edit Job
            </Button>
          )}

          {/* View Details Button */}
          <Button
            bgColor="bg-[#ED5353] hover:bg-red-500"
            className="h-8 px-6 py-1"
            onClick={() => navigate(`/job-des/${job._id}`)}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
