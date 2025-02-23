import React, { useEffect, useState, memo, lazy, Suspense } from "react";
import Searchable from "../components/Ui/Searchable";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import Button from "../components/Ui/Button";
import { debounce, set } from "lodash";

const Joblist = lazy(() => import("../components/Joblist"));
const MemoizedJoblist = memo(Joblist);

const Home = () => {
  const { userId, accessToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [jobsCache, setJobsCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchJobs = debounce(async (currentPage, isUserJobs) => {
    setLoading(true);
    try {
      let response;
      if (isUserJobs) {
        response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/get-job-by-user?page=${currentPage}&limit=${limit}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      } else {
        response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/get-all-jobs?page=${currentPage}&limit=${limit}`
        );
      }

      const jobsData = response.data.data?.jobs || response.data.data || [];
      setJobs(jobsData);
      setJobsCache((prevCache) => ({ ...prevCache, [currentPage]: jobsData }));
      setTotalPages(response.data.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleFilter = (selectedSkills) => {
    if (selectedSkills.length > 0) {
      console.log("Selected Skills:", selectedSkills);
      axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/get-job-by-skill?skills?page=${page}&limit=${limit}`,
          { skills: selectedSkills }
        )
        .then((response) => {
          setJobs(response.data.data.jobs);
          setTotalPages(response.data.data.totalPages);
          console.log("Jobs by skills:", response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching jobs by skills:", error);
          setJobs([]);
        });
    } else {
      fetchJobs(page, userId ? true : false);
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch jobs for logged-in user
      console.log("jobsCache", jobsCache);
      if (jobsCache[page]) {
        setJobs(jobsCache[page]);
        setLoading(false);
      } else {
        fetchJobs(page, true);
      }
    } else {
      // Fetch all jobs after logout
      fetchJobs(page, false);
    }
  }, [userId, accessToken, page]);

  return (
    <div className="mb-10">
      <Searchable onFilter={handleFilter} />

      {/* Job List with Skeleton Loading */}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      ) : jobs.length > 0 ? (
        <Suspense fallback={<p></p>}>
          <MemoizedJoblist jobs={jobs} />
        </Suspense>
      ) : (
        <p className="text-center text-gray-500">No jobs available</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Button
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => prev - 1)}
          className={`mr-2 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "bg-red-400 hover:bg-red-700"
          }`}
        >
          Previous
        </Button>

        <span className="px-4 py-2">
          {loading ? "Loading..." : `Page ${page} of ${totalPages}`}
        </span>

        <Button
          disabled={page === totalPages || loading}
          onClick={() => setPage((prev) => prev + 1)}
          className={`bg-red-400 hover:bg-red-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
