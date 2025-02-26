import express from "express";
import { createUser } from "../controllers/hrController.mjs";
import auth from "../middleware/auth.mjs";
import adminCheck from "../middleware/adminCheck.mjs"; // Add admin middleware

const router = express.Router();

router.post("/users", auth, adminCheck, createUser);

export default router;
