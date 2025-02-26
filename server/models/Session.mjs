import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loginAt: { type: Date, default: Date.now },
  logoutAt: Date,
  ip: String,
  userAgent: String,
  location: String,
  isActive: { type: Boolean, default: true },
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;
