import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { FaAngleDown, FaCross } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { set } from "lodash";

const Searchable = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const availableSkills = [
    "Frontend",
    "CSS",
    "JavaScript",
    "Node",
    "React",
    "Tailwind",
    "HTML",
    "Java",
    "Django",
  ];

  // Get login status from Auth context
  const { userId } = useAuth();
  const navigate = useNavigate();

  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => {
        const updatedSkills = [...prevSkills, skill];

        if (userId) {
          console.log("Selected Skills:", updatedSkills);
          onFilter(updatedSkills); // Login hone par filter turant apply ho
        }
        return updatedSkills;
      });
    }
  };

  const handlefilter = async () => {
    console.log("Selected Skills:", selectedSkills);
    onFilter(selectedSkills);
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    onFilter(selectedSkills.filter((s) => s !== skill));
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSearch("");
    onFilter([]);
  };

  const hasFilter = search.trim() !== "" || selectedSkills.length > 0;

  return (
    <div className=" w-full max-w-[58.5rem] mx-auto p-5">
      <div className="bg-white shadow-[0_0_12px_3px_rgba(0,0,0,0.2)] border-none rounded-none p-6 md:p-8 lg:p-10 shadow-red-200 w-full">
        <Input
          className="w-full p-2 border rounded-md shadow-sm mb-3"
          placeholder="Type any job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Skill Selection & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Skill Selection Dropdown */}
          <div className="relative w-full sm:w-auto flex justify-center">
            <select
              className="py-1 mx-auto outline-0 border-2 border-gray-300 px-6 rounded-lg w-full sm:w-auto  appearance-none font-semibold bg-white"
              onChange={(e) => addSkill(e.target.value)}
              defaultValue=""
              style={{
                color: "#d1d5dc",
                WebkitTextFillColor: "#99a1af",
                fontSize: "14px",
              }}
            >
              <option value="" disabled>
                Skills
              </option>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            {/* Custom Arrow */}
            <div className="absolute inset-y-0 mt-[1px] right-8 flex items-center pointer-events-none text-gray-400">
              <FaAngleDown />
            </div>
          </div>

          {/* Selected Skills */}
          <div className="flex flex-wrap gap-2 w-64 font-semibold text-sm">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="flex pl-2 items-center bg-red-200 text-black  rounded-none"
              >
                <span className="py-1">{skill}</span>
                <button
                  className="ml-2 h-full text-white bg-red-500 px-[2px] py-[4px] rounded-none"
                  onClick={() => removeSkill(skill)}
                >
                  <MdOutlineClose fontSize={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:ml-auto">
            {userId ? (
              // If logged in, show "Add Job" button with a plus sign
              <Button
                bgColor="bg-red-400 hover:bg-red-500"
                onClick={() => navigate("/add-job")}
              >
                + Add Job
              </Button>
            ) : (
              // If not logged in, show "Apply Filter" and "Clear" only when a filter is applied
              hasFilter && (
                <>
                  <Button bgColor="bg-red-500" onClick={handlefilter}>
                    Apply Filter
                  </Button>
                  <Button
                    bgColor="bg-transparent"
                    textColor="text-red-500"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchable;
