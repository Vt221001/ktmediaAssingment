import { User } from "../models/user.Model.js";
import { asyncHandler } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { Job } from "../models/job.Model.js";
import { jobValidationSchema } from "../validation/job.Validation.js";

export const createJob = asyncHandler(async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    jobLocation,
    companyLocation,
    jobDescription,
    aboutCompany,
    skillRequired,
  } = req.body;

  console.log("req.body", req.body);

  const { error } = jobValidationSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, error.details[0].message));
  }

  const userId = req.user?.id;
  console.log("fshjkhkdsjf", userId);

  if (!userId) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Unauthorized access"));
  }

  const job = new Job({
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    jobLocation,
    companyLocation,
    jobDescription,
    aboutCompany,
    skillRequired,
    userId,
  });

  await job.save();

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  user.jobs = user.jobs || [];
  user.jobs.push(job._id);
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, job, "Job created successfully"));
});

export const updateJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Unauthorized access"));
  }

  const { error } = jobValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, error.details[0].message));
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json(new ApiResponse(404, null, "Job not found"));
  }

  if (job.userId.toString() !== userId) {
    return res
      .status(403)
      .json(
        new ApiResponse(403, null, "You are not authorized to update this job")
      );
  }

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedJob, "Job updated successfully"));
});

export const getAllJobs = asyncHandler(async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  if (page < 1) page = 1;

  const skip = (page - 1) * limit;

  const [totalJobs, jobs] = await Promise.all([
    Job.countDocuments(),
    Job.find({})
      .populate("userId", "name email")
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  if (!jobs.length) {
    return res.status(404).json(new ApiResponse(404, [], "No jobs found"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        jobs,
        totalPages: Math.ceil(totalJobs / limit),
        currentPage: page,
        totalJobs,
      },
      "Jobs fetched"
    )
  );
});

export const getJobByUserId = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Unauthorized access"));
  }

  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  if (page < 1) page = 1;

  const skip = (page - 1) * limit;

  const [totalJobs, jobs] = await Promise.all([
    Job.countDocuments({ userId: req.user.id }),
    Job.find({ userId: req.user.id })
      .populate("userId", "name email")
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  if (!jobs.length) {
    return res.status(404).json(new ApiResponse(404, [], "No jobs found"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        jobs,
        totalPages: Math.ceil(totalJobs / limit),
        currentPage: page,
        totalJobs,
      },
      "User's jobs fetched"
    )
  );
});

export const searchJobBySkillAndPosition = asyncHandler(async (req, res) => {
  const { jobPosition, skillRequired, page = 1, limit = 8 } = req.query;
  const filter = {};

  if (req.user && req.user.id) {
    filter.userId = req.user.id;
  }

  if (jobPosition) {
    filter.jobPosition = { $regex: jobPosition, $options: "i" };
  }

  if (skillRequired) {
    const skillsArray = skillRequired
      .split(",")
      .map((skill) => new RegExp(`^${skill}$`, "i"));
    filter.skillRequired = { $in: skillsArray };
  }

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const [totalJobs, jobs] = await Promise.all([
    Job.countDocuments(filter),
    Job.find(filter)
      .populate("userId", "name email")
      .skip(skip)
      .limit(limitNumber)
      .lean(),
  ]);

  if (jobs.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No jobs found"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        jobs,
        totalJobs,
        totalPages: Math.ceil(totalJobs / limitNumber),
        currentPage: pageNumber,
      },
      "Jobs fetched successfully"
    )
  );
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    "userId",
    "name email"
  );

  if (!job) {
    return res.status(404).json(new ApiResponse(404, null, "Job not found"));
  }

  return res.status(200).json(new ApiResponse(200, job, "Job fetched"));
});

export const searchJobBySkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;
  const { page = 1, limit = 8 } = req.query;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, [], "Skills are required in an array format"));
  }

  const skillsArray = skills.map((skill) => new RegExp(`^${skill}$`, "i"));

  const filter = {
    skillRequired: { $in: skillsArray },
  };

  if (req.user && req.user.id) {
    filter.userId = req.user.id;
  }

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const [totalJobs, jobs] = await Promise.all([
    Job.countDocuments(filter),
    Job.find(filter)
      .populate("userId", "name email")
      .skip(skip)
      .limit(limitNumber)
      .lean(),
  ]);

  if (jobs.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No jobs found"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        jobs,
        totalJobs,
        totalPages: Math.ceil(totalJobs / limitNumber),
        currentPage: pageNumber,
      },
      "Jobs fetched successfully"
    )
  );
});
