import { Request, Response } from 'express';
import User from '../../models/user';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from '../../utils/sendEmail';
import ctrlWrapper from '../../utils/ctrlWrapper';

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  } else {
    const token = uuidv4();
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
      resetPasswordExpires: expiresIn,
    });

    const mail = {
      to: email,
      subject: 'Reset your password',
      html: `<p>To reset your password, click on this <a href="http://localhost:3000/Phonebook/reset-password/${token}">link</a>.</p>`,
    };
    await sendEmail(mail);
  }

  res.status(200).json({ message: 'Reset password email has been sent.' });
};

export default ctrlWrapper(forgotPassword);
