import { Response } from 'express';
import User from '../../models/user';
import { CustomRequest } from '../../types/express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import cloudinary from '../../utils/cloudinary';

const deleteUser = async (req: CustomRequest, res: Response) => {
  const { _id, avatar } = req.user as { _id: string; avatar: string };

  if (!avatar.includes('google') && !avatar.includes('facebook')) {
    const oldAvatarPublicId = avatar;
    const startsWith = oldAvatarPublicId.indexOf('pulse/users/');
    const publicIdWithExpansion = oldAvatarPublicId.slice(startsWith);
    const lastDotIndex = publicIdWithExpansion.lastIndexOf('.');
    const publicId = publicIdWithExpansion.slice(0, lastDotIndex);
    await cloudinary.uploader.destroy(publicId);
  }
  await User.findByIdAndDelete(_id);

  res.status(204).end();
};

export default ctrlWrapper(deleteUser);
