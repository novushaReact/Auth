import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';

export const createUser = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    // 1. Generate username
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;

    // 2. Check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 3. Hash default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234', salt);

    // 4. Create user
    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      username,
      tempPassword: '1234' 
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};