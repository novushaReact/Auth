import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/auth.mjs";
import hrRoutes from "./routes/hr.mjs";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting for auth routes (5 requests/15min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later.",
});
app.use("/api/auth/login", limiter);

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
