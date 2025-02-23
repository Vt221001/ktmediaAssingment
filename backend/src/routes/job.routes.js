import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  getJobByUserId,
  searchJobBySkillAndPosition,
  searchJobBySkills,
  updateJob,
} from "../controllers/job.Controller.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";

const router = express.Router();

router.post("/add-job", authenticateToken, createJob);
router.put("/update-job/:id", authenticateToken, updateJob);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-job-by-user", authenticateToken, getJobByUserId);
router.get("/search-jobs", authenticateToken, searchJobBySkillAndPosition);
router.get("/get-job/:id", getJobById);
router.post("/get-job-by-skill", searchJobBySkills);

export { router as jobRouter };
