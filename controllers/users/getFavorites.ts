import User from '../../models/user';
import { CustomRequest, IUser } from '../../types/express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { Response } from 'express';

const getFavorites = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user as IUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const favorites: any = await User.findById(
    { _id },
    '-_id favoriteProducts',
  ).populate('favoriteProducts');

    if (!favorites.favoriteProducts.length) {
        res.status(404).json({ message: 'No favorite products' });
        return;
  }

  res.status(200).json(favorites.favoriteProducts);
};

export default ctrlWrapper(getFavorites);
