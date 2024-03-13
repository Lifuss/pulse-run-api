import { Response } from 'express';
import { CustomRequest } from '../../types/express';
import ctrlWrapper from '../../utils/ctrlWrapper';

const current = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { email, token, profile } = req.user;
  res.status(200).json({ token, user: { ...profile, email } });
};
export default ctrlWrapper(current);
