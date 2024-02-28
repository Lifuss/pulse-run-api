import { Response } from 'express';
import User from '../../models/user';
import { CustomRequest } from '../../types/express';
import ctrlWrapper from '../../utils/ctrlWrapper';

const deleteUser = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user as { _id: string };
  await User.findByIdAndDelete(_id);
  res.status(204).end();
};

export default ctrlWrapper(deleteUser);
