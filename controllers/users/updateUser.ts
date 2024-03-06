import { Response } from 'express';
import { CustomRequest } from '../../types/express';
import User from '../../models/user';
import bcryptjs from 'bcryptjs';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';
import cloudinary from '../../utils/cloudinary';
import fs from 'fs/promises';

type TUser = {
  email?: string;
  password?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
};

const updateUser = async (req: CustomRequest, res: Response) => {
  const { _id, avatar, profile: oldProfile, token } = req.user;
  const { firstName, lastName, phone, password, email } = req.body;

  if (!firstName && !lastName && !phone && !password && !email && !req.file) {
    requestError(400, 'No data to update');
    return;
  }

  let avatarThumb = avatar;

  if (req.file) {
    const { path: oldPath } = req.file;

    if (!avatar.includes('google') && !avatar.includes('facebook') && avatar) {
      const oldAvatarPublicId = avatar;
      const startsWith = oldAvatarPublicId.indexOf('pulse/users/');
      const publicIdWithExpansion = oldAvatarPublicId.slice(startsWith);
      const lastDotIndex = publicIdWithExpansion.lastIndexOf('.');
      const publicId = publicIdWithExpansion.slice(0, lastDotIndex);

      await cloudinary.uploader.destroy(publicId);
    }
    const upload = await cloudinary.uploader.upload(oldPath, {
      folder: 'pulse/users',
      transformation: [{ width: 400, height: 400, crop: 'fill' }],
    });
    const newAvatarUrl = upload.secure_url;
    avatarThumb = newAvatarUrl;
    await fs.unlink(oldPath);
  }

  const updateUser: TUser = {
    profile: {
      ...oldProfile,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phone && { phone }),
    },
  };
  if (password) {
    updateUser.password = await bcryptjs.hash(password, 5);
  }
  if (email) {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      res.status(409).send('Email already exists');
      return;
    }
    updateUser.email = email;
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      ...(avatarThumb && { avatar: avatarThumb }),
      ...(updateUser.email && { email: updateUser.email }),
      ...(updateUser.password && { password: updateUser.password }),
      ...(updateUser.profile && { profile: updateUser.profile }),
    },
    {
      new: true,
    },
  );
  res.status(200).json({
    token,
    user: {
      ...updatedUser?.profile,
      email: updatedUser?.email,
      avatar: updatedUser?.avatar,
    },
  });
};

export default ctrlWrapper(updateUser);
