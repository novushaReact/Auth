import express from "express";
import {
  login,
  logout,
  changePassword,
} from "../controllers/authController.mjs";
import auth from "../middleware/auth.mjs";
import fraudDetection from "../middleware/fraudDetection.mjs";

const router = express.Router();

router.post("/login", fraudDetection, login);
router.post("/logout", auth, logout);
router.post("/change-password", auth, changePassword);
// router.get('/sessions', auth, getSessions);

export default router;
