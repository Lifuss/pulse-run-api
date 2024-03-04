import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import ctrlWrapper from '../../utils/ctrlWrapper';

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    res.status(400).json({ message: 'Invalid or expired token' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
};

export default ctrlWrapper(resetPassword);
