import { Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { CustomRequest } from '../../types/express';

dotenv.config();

const { FRONTEND_URL, JWT_SECRET } = process.env;

const googleAuth = async (req: CustomRequest, res: Response) => {
  if (!req.user || !JWT_SECRET) {
    throw new Error('User not found');
  }

  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h',
  });

  await User.findByIdAndUpdate(id, { token });

  // res.redirect(`${FRONTEND_URL}/Phonebook/login?token=${token}`);
  res.redirect(`http://localhost:3000/Phonebook/contacts?token=${token}`);
};

export default ctrlWrapper(googleAuth);
