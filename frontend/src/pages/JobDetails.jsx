import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { PiMoneyFill } from "react-icons/pi";
import { FaCalendar } from "react-icons/fa6";
import Button from "../components/Ui/Button";
import { useAuth } from "../context/Authcontext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("edit page", userId);

  // Function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-job/${id}`
        );
        let data = response.data.data;

        // Capitalizing required fields
        data.jobPosition = capitalizeWords(data.jobPosition);
        data.companyName = capitalizeWords(data.companyName);
        data.jobType = capitalizeWords(data.jobType);

        setJobData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-red-100 min-h-screen relative">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white text-black text-center p-4 mt-2 rounded-none shadow-[2px_2px_10px_1px_rgba(0,0,0,0.2)] shadow-gray-300 relative -top-5">
        <h1 className="text-lg font-semibold">
          {jobData?.jobPosition} at {jobData?.companyName}
        </h1>
      </div>

      {/* Job Posting Card */}
      <div className="w-full max-w-4xl bg-white rounded-none px-12 py-6 my-8 shadow-[2px_2px_10px_1px_rgba(0,0,0,0.2)] shadow-gray-300">
        <p className="text-sm flex justify-start items-center gap-2 text-gray-500">
          {"1w ago"} <GoDotFill fontSize={8} /> {jobData?.jobType}
        </p>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-gray-900 mt-2">
            {jobData?.jobPosition}
          </h1>

          {userId && (
            <Button
              onClick={() => navigate(`/edit-job/${id}`)}
              className="bg-red-400 hover:bg-red-500 px-4 py-1 px-8 h-8"
            >
              Edit job
            </Button>
          )}
        </div>
        <p className="text-red-500  text-sm font-semibold mt-2">
          {jobData?.companyLocation}
        </p>

        <div className="flex justify-start gap-12 mt-4">
          <div>
            <p className="text-gray-400 justify-start items-center gap-2 flex  mt-2">
              <PiMoneyFill /> Stipend
            </p>
            <p className="text-gray-700">Rs {jobData?.monthlySalary}/month</p>
          </div>
          <div>
            <p className="text-gray-400 justify-start items-center gap-2 flex mt-2">
              <FaCalendar /> Duration
            </p>
            <p className="text-gray-700 ">{jobData?.jobType}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-4">About Company</h2>
        <p className="text-gray-700 text-lg text-left mt-2">
          {jobData?.aboutCompany} It is a long established fact that a reader
          will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English.
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          injected humour and the like.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-4">
          About The Job/Internship
        </h2>
        <p className="text-gray-700 text-lg text-left mt-2">
          {jobData?.jobDescription} It is a long established fact that a reader
          will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using
          'Content here, content here', making it look like readable English.
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          injected humour and the like. We are looking for a responsible
          PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for
          managing services and therefore the interchange of knowledge between
          the server and the users. The candidate's primary focus is going to be
          the event of all server-side logic, definition, and maintenance of the
          central database and ensuring high performance and responsiveness to
          requests from the front end. Selected intern's day-to-day
          responsibilities include: 1. Work on the development of theme
          customization, liquid programming language, and corresponding apps 2.
          Implement system integrations that are crucial to our success 3.
          Contribute to the development of HTML5/CSS/JavaScript and standard web
          technologies integral to building seamless multi-channel experiences
          4. Work on speed optimization and making a mobile-friendly website
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-4">
          Skills Required
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {jobData?.skillRequired.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#FFEEEE] text-gray-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-4">
          Additional Information
        </h2>
        <p className="text-gray-700 text-lg text-justify mt-2">
          We are looking for a responsible PHP/WordPress/Laravel/Shopify
          Developer. He/She will be liable for managing services and therefore
          the interchange of knowledge between the server and the users. The
          candidate's primary focus is going to be the event of all server-side
          logic, definition, and maintenance of the central database and
          ensuring high performance and responsiveness to requests from the
          front end.
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
