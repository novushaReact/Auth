import express from "express";
import {
  login,
  logout,
  changePassword,
} from "../controllers/authController.mjs";
import fraudDetection from "../middleware/fraudDetection.mjs";
import auth from "../middleware/auth.mjs";

const router = express.Router();

// POST /api/auth/login
router.post("/login", fraudDetection, login);

// POST /api/auth/logout
router.post("/logout", auth, logout);

// POST /api/auth/change-password
router.post("/change-password", auth, changePassword);

export default router;
