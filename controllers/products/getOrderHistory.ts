import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import User from '../../models/user';
import { IUser } from '../../types/express';

const getOrderHistory = async (req: Request, res: Response) => {
  const { _id } = req.user as IUser;

  const userBuyHistory = await User.findById(_id, '-_id buyHistory').populate({
    path: 'buyHistory',
    populate: {
      path: 'products.productId products.sizeId',
      select: 'name imgThumbnail value',
    },
  });

  res.status(200).json(userBuyHistory);
};

export default ctrlWrapper(getOrderHistory);
