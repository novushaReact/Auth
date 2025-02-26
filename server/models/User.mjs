import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isInitialPassword: { type: Boolean, default: true },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
