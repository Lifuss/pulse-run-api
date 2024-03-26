import { Response } from 'express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { CustomRequest } from '../../types/express';
import { Types } from 'mongoose';

const deleteFavorite = async (req: CustomRequest, res: Response) => {
  const { _id, favoriteProducts } = req.user as {
    _id: Types.ObjectId;
    favoriteProducts: string[];
  };
  const { productId } = req.body as { productId: string };

  if (!favoriteProducts.find((id) => id.toString() === productId)) {
    res.status(404).json({ message: 'Product does not exist in favorites' });
    return;
  }

  const userFav = await User.findByIdAndUpdate(
    _id,
    {
      favoriteProducts: favoriteProducts.filter(
        (id) => id.toString() !== productId,
      ),
    },
    { new: true },
  );

  if (userFav) {
    res.json(userFav.favoriteProducts);
  }
};

export default ctrlWrapper(deleteFavorite);
