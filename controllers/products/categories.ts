import { Request, Response } from 'express';

import ctrlWrapper from '../../utils/ctrlWrapper';
import { Brand, Color, Size } from '../../models/products';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNames = async (Model: any) => {
  let items;
  if (Model === Size) {
    items = await Model.find({}, 'value');
    return items.map((item: { value: string }) => item.value);
  } else {
    items = await Model.find({}, 'name');
    return items.map((item: { name: string }) => item.name);
  }
};
const categories = async (req: Request, res: Response) => {
  const [brandNames, colorNames, sizeNames] = await Promise.all([
    getNames(Brand),
    getNames(Color),
    getNames(Size),
  ]);

  res.status(200).json({
    seasons: ['winter', 'summer', 'all-season'],
    sex: ['male', 'female', 'unisex'],
    brands: brandNames,
    colors: colorNames,
    sizes: sizeNames,
  });
};

export default ctrlWrapper(categories);
