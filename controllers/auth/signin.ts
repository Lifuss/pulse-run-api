import { Request, Response } from 'express';
import User from '../../models/user';
import bcryptjs from 'bcryptjs';
import ctrlWrapper from '../../utils/ctrlWrapper';
import jwt from 'jsonwebtoken';

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return;
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: 'Invalid password' });
    return;
  }

  const payload = {
    id: user._id,
  };
  const secretKey: string = process.env.JWT_SECRET || 'default_secret';
  const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

  res.status(200).json({ token, user: user.profile });
};

export default ctrlWrapper(signIn);
