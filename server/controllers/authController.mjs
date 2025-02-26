import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import Session from "../models/Session.mjs";
import axios from "axios";

// Helper: Get location from IP
const getLocation = async (ip) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.IP_API_KEY}`
    );
    const { location } = response.data;
    return `${location.city}, ${location.country}`;
  } catch {
    return "Unknown";
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // 3. Log session
    const ip = req.ip || req.connection.remoteAddress;
    const location = await getLocation(ip);

    const session = new Session({
      userId: user._id,
      ip,
      userAgent: req.headers["user-agent"],
      location,
    });
    console.log(session);
    await session.save();

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user._id, tokenVersion: user.tokenVersion },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 6. Send response
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    await Session.findByIdAndUpdate(req.session._id, {
      isActive: false,
      logoutAt: Date.now(),
    });

    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    // 1. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    // 2. Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 3. Update security flags
    user.isInitialPassword = false;
    user.tokenVersion += 1;

    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Server error" });
  }
};