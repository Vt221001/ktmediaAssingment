import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Ui/Input";
import Button from "../components/Ui/Button";
import Job from "../assets/add-job.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { set } from "lodash";
import { MdOutlineClose } from "react-icons/md";
import SideImage from "../components/Login/Register/SideImage";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const { register, handleSubmit, reset } = useForm();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const setDataToFields = async () => {
      if (id !== "undefined" && id) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/get-job/${id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          const filledData = res.data.data;
          console.log("Filled data:", filledData);
          reset({
            companyName: filledData.companyName,
            logoUrl: filledData.logoUrl,
            jobPosition: filledData.jobPosition,
            monthlySalary: filledData.monthlySalary,
            jobType: filledData.jobType,
            jobLocation: filledData.jobLocation,
            companyLocation: filledData.companyLocation,
            jobDescription: filledData.jobDescription,
            aboutCompany: filledData.aboutCompany,
            skillRequired: filledData.skillRequired,
          });
          setSkills(filledData.skillRequired);
        } catch (error) {
          console.error("Error fetching job details:", error);
          alert("Error fetching job details");
        }
      }
    };
    setDataToFields();
  }, [id]);

  const onSubmit = async (data) => {
    console.log("user id", id);
    console.log("Before jobData:", data);
    const jobData = { ...data, skillRequired: skills };

    console.log("Job data:", jobData);
    if (id !== "undefined" && id) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/update-job/${id}`,
          jobData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        alert("Job updated successfully");
      } catch (error) {
        console.error("Error updating job:", error);
        alert("Error updating job");
      }
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/add-job`,
          jobData,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log("Job added successfully:", response.data.data);
        reset();
        setSkills([]);
      } catch (error) {
        console.error("Error adding job:", error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      <div className="w-full md:min-w-3xl flex flex-col flex-1 justify-center text-center md:text-left px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-semibold mb-6">Add Job Description</h2>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">Company Name</label>
            <Input
              placeholder="Enter your company name here"
              {...register("companyName")}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">Add Logo URL</label>
            <Input placeholder="Enter the logo URL" {...register("logoUrl")} />
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">Job Position</label>
            <Input
              placeholder="Enter job position"
              {...register("jobPosition")}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">
              Monthly Salary
            </label>
            <Input
              placeholder="Enter Amount in rupees"
              type="number"
              {...register("monthlySalary")}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
            <label className="w-full md:w-1/5 font-medium">Job Type</label>
            <select
              {...register("jobType")}
              className="w-full md:w-3/8 px-3 py-2 rounded-lg border border-gray-200"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
            <label className="w-full md:w-1/5 font-medium">Remote/Office</label>
            <select
              {...register("jobLocation")}
              className="w-full md:w-3/8 px-3 py-2 rounded-lg border border-gray-200"
            >
              <option>Remote</option>
              <option>Office</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">Location</label>
            <Input
              placeholder="Enter Location"
              {...register("companyLocation")}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">
              Job Description
            </label>
            <textarea
              placeholder="Type the job description"
              {...register("jobDescription")}
              className="w-full h-20 p-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/4 font-medium">About Company</label>
            <textarea
              placeholder="About Company"
              {...register("aboutCompany")}
              className="w-full h-20 p-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>
          <div>
            <label className="w-full md:w-1/4 font-medium">Skills</label>
            <Input
              placeholder="Enter skills & press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex pl-2 items-center bg-red-200 text-black  rounded-none"
                >
                  <span className="mr-2">{skill}</span>
                  <MdOutlineClose
                    size={16}
                    className="cursor-pointer ml-2 h-full text-white bg-red-500 px-[2px] py-[4px] rounded-none"
                    onClick={() => removeSkill(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              bgColor="border-2 text-gray-400 border-gray-300 hover:bg-gray-200"
              textColor="text-black"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button bgColor="bg-red-500" type="submit">
              {id ? "Update Job" : "+ Add Job"}
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full relative md:w-2xl h-full hidden md:block">
        <SideImage
          img={Job}
          height={"h-[125vh]"}
          title={"Recruiter add job details here"}
        />
      </div>
    </div>
  );
};

export default AddJob;
