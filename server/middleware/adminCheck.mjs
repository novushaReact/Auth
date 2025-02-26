import User from '../models/User.mjs';

const adminCheck = async (req, res, next) => {
  try {
    // 1. Get the user from the database
    const user = await User.findById(req.user.userId);

    // 2. Check if the user exists and is an admin
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // 3. Proceed if the user is an admin
    next();
  } catch (err) {
    console.error('Admin check error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export default adminCheck;
