import { Request, Response } from 'express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';
import bcryptjs from 'bcryptjs';

const signup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(400, 'User with this email already exists');
  }
  const hashedPassword = await bcryptjs.hash(password, 5);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    roles: ['user'],
    profile: {
      firstName: name,
      lastName: '',
      phone: '0000000000',
    },
  });
  res.status(201).json({ user: newUser });
};

export default ctrlWrapper(signup);
