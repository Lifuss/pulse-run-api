import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';
import bcryptjs from 'bcryptjs';

const signup = async (req: Request, res: Response) => {
  const { email, firstName, password, lastName } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'User with this email already exists');
  }
  const hashedPassword = await bcryptjs.hash(password, 5);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    profile: {
      firstName,
      lastName,
    },
  });

  const payload = {
    id: newUser._id,
  };
  const secretKey: string = process.env.JWT_SECRET || 'default_secret';
  const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({ token, user: { ...newUser.profile, email } });
};

export default ctrlWrapper(signup);
