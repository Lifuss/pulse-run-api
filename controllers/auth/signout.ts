import { Response } from 'express';
import { CustomRequest } from '../../types/express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import User from '../../models/user';

const signout = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(200).json({ message: 'Signout success' });
};
export default ctrlWrapper(signout);
