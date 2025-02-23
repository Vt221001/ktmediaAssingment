import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/user.Controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);

export { router as userRouter };
