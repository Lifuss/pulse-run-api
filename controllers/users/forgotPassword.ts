import { Request, Response } from 'express';
import User from '../../models/user';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from '../../utils/sendEmail';
import ctrlWrapper from '../../utils/ctrlWrapper';
import dotenv from 'dotenv';

dotenv.config();

const { FRONTEND_URL } = process.env;

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const resetToken = uuidv4();
  const expiresIn = new Date();
  expiresIn.setHours(expiresIn.getHours() + 1);

  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: resetToken,
    resetPasswordExpires: expiresIn,
  });

  const mail = {
    to: email,
    subject: 'Reset your password',
    html: `<p>To reset your password, click on this <a href="${FRONTEND_URL}/reset-password?resetToken=${resetToken}">link</a>.</p>`,
  };
  await sendEmail(mail);

  res.status(200).json({ message: 'Reset password email has been sent.' });
};

export default ctrlWrapper(forgotPassword);
