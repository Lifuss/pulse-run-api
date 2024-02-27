import { Request, Response } from 'express';

import ctrlWrapper from '../../utils/ctrlWrapper';
import cloudinary from '../../utils/cloudinary';
import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';
import { Brand, Color, Product, Size } from '../../models/products';

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

  const colorArray: Types.ObjectId[] = [];
  for (let i = 0; i < color.length; i++) {
    const checkColor = await Color.findOne({ name: color[i] });
    if (!checkColor) {
      const newColor = await Color.create({ name: color[i] });
      colorArray.push(newColor._id);
    } else {
      colorArray.push(checkColor._id);
    }
  }

  const sizeArray: Types.ObjectId[] = [];
  for (let i = 0; i < size.length; i++) {
    const checkSize = await Size.findOne({ value: size[i] });
    if (!checkSize) {
      const newSize = await Size.create({ value: size[i] });
      sizeArray.push(newSize._id);
    } else {
      sizeArray.push(checkSize._id);
    }
  }

  let checkBrand = await Brand.findOne({ name: brand });
  if (!checkBrand) {
    checkBrand = await Brand.create({ name: brand });
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
      color: colorArray,
      size: sizeArray,
      brand: checkBrand?._id,
    },
  });

  res.status(201).json(product);
};
export default ctrlWrapper(createProducts);
