import { Request, Response } from 'express';
import { Brand, Color, Size } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNames = async (Model: any) => {
  const items = await Model.find({}, 'name');
  return items.map((item: { name: string }) => item.name);
};
const categories = async (req: Request, res: Response) => {
  const [brandNames, colorNames, sizeNames] = await Promise.all([
    getNames(Brand),
    getNames(Color),
    getNames(Size),
  ]);

  res.status(200).json({
    brands: brandNames,
    colors: colorNames,
    sizes: sizeNames,
    seasons: ['winter', 'summer', 'all-season'],
  });
};

export default ctrlWrapper(categories);
