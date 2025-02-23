import Card from "./Card";

// const jobList = [
//   {
//     id: 1,
//     company: "Google",
//     role: "Software Engineer",
//     location: "Pune",
//     salary: "70,000",
//     type: "Office",
//     jobType: "Full Time",
//     employees: "1000+",
//     workType: "Remote",
//     skills: ["Java", "Python", "DSA", "Database"],
//   },
//   {
//     id: 1,
//     company: "Google",
//     role: "Software Engineer",
//     location: "Pune",
//     logo: "https://plus.unsplash.com/premium_photo-1661914978519-52a11fe159a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     salary: "70,000",
//     type: "Office",
//     jobType: "Full Time",
//     employees: "1000+",
//     workType: "Remote",
//     skills: ["Java", "Python", "DSA", "Database"],
//   },
//   {
//     id: 1,
//     company: "Google",
//     role: "Software Engineer",
//     location: "Pune",
//     salary: "70,000",
//     type: "Office",
//     jobType: "Full Time",
//     employees: "1000+",
//     workType: "Remote",
//     skills: ["Java", "Python", "DSA", "Database"],
//   },
//   {
//     id: 1,
//     company: "Google",
//     role: "Software Engineer",
//     location: "Pune",
//     salary: "70,000",
//     type: "Office",
//     jobType: "Full Time",
//     employees: "1000+",
//     workType: "Remote",
//     skills: ["Java", "Python", "DSA", "Database"],
//   },
// ];

const Joblist = ({ jobs = [] }) => {
  console.log("props recive succesfuully", jobs);
  return (
    <div className="">
      {jobs.length > 0 ? (
        jobs.map((job) => <Card key={job._id} job={job} />)
      ) : (
        <p className="text-center text-gray-500">No jobs available</p>
      )}
    </div>
  );
};

export default Joblist;
