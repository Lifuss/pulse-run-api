import { Request, Response } from 'express';
import { Brand, Color, Product, Size } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';
import cloudinary from '../../utils/cloudinary';
import fs from 'fs';
import path from 'path';

const createProducts = async (req: Request, res: Response) => {
  const {
    name,
    price,
    sale,
    description,
    features,
    sex,
    color,
    brand,
    size,
    season,
  } = req.body;

  if (
    !req.files ||
    !('imgThumbnail' in req.files) ||
    !('imgGallery' in req.files)
  ) {
    res
      .status(400)
      .send('Missing files (немає картинки в imgGallery або в imgThumbnail)');
    return;
  }
  const thumbnailPath = req.files.imgThumbnail[0].path;
  const galleryPaths = req.files.imgGallery.map(
    (file: { path: string }) => file.path,
  );

  const imgThumbnailUrl = await cloudinary.uploader.upload(thumbnailPath, {
    folder: 'pulse/sneakers',
  });
  const imgGalleryUrl = await Promise.all(
    galleryPaths.map((img) =>
      cloudinary.uploader.upload(img, {
        folder: 'pulse/sneakers',
      }),
    ),
  );

  fs.unlinkSync(path.resolve(thumbnailPath));
  galleryPaths.forEach((imgPath) => fs.unlinkSync(path.resolve(imgPath)));

  const imgThumbnail = imgThumbnailUrl.secure_url;
  const imgGallery = imgGalleryUrl.map((img) => img.secure_url);

  let checkColor = await Color.findOne({ color });
  if (!checkColor) {
    checkColor = await Color.create({ color });
  }
  let checkSize = await Size.findOne({ size });
  if (!checkSize) {
    checkSize = await Size.create({ size });
  }
  let checkBrand = await Brand.findOne({ brand });
  if (!checkBrand) {
    checkBrand = await Brand.create({ brand });
  }

  const product = await Product.create({
    name,
    price,
    sale,
    description,
    imgThumbnail,
    imgGallery,
    features,
    categories: {
      sex,
      season,
      color: checkColor?._id,
      size: checkSize?._id,
      brand: checkBrand?._id,
    },
  });

  res.status(201).json(product);
};
export default ctrlWrapper(createProducts);
