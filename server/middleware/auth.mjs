import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.userId,
      tokenVersion: decoded.tokenVersion,
    });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default auth;
