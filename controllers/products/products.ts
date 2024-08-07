import { Brand, Color, Product, Size } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';

import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Query, ReqQuery } from '../../types/express';

const products = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 15,
    sort = 'createdAt',
    order = 'desc',
    brand,
    color,
    size,
    sex,
    season,
  } = req.query as ReqQuery;

  if (+page < 1 || +limit < 1) {
    res.status(400).json({ message: 'Invalid page or limit' });
    return;
  }

  const query: FilterQuery<typeof Product> = {};

  if (brand) {
    const brandValues = brand.split(',');
    const brandDocs = await Brand.find({ name: { $in: brandValues } });
    const brandIds = brandDocs.map((doc) => doc._id.toString());
    query['categories.brand'] = { $in: brandIds };
  }
  if (color) {
    const colorValues = color.split(',');
    const colorDocs = await Color.find({ name: { $in: colorValues } });
    const colorIds = colorDocs.map((doc) => doc._id.toString());
    query['categories.color'] = { $in: colorIds };
  }
  if (size) {
    const sizeValues = size.split(',');
    const sizeDocs = await Size.find({ value: { $in: sizeValues } });
    const sizeIds = sizeDocs.map((doc) => doc._id.toString());
    query['categories.size'] = { $in: sizeIds };
  }

  if (sex) query['categories.sex'] = (sex as string).split(',');
  if (season) query['categories.season'] = (season as string).split(',');

  const products = await Product.find(query as Partial<Query>)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .populate('categories.brand')
    .populate('categories.color')
    .populate('categories.size')
    .sort({ [sort]: order as 'asc' | 'desc' })
    .lean();

  const normalizedProducts = products.map((product) => {
    if (product.sale && product.price) {
      return {
        ...product,
        price: Math.ceil(product.price),
      };
    }
    return product;
  });

  const totalDoc = await Product.countDocuments(query as Partial<Query>);
  const totalPages = Math.ceil(totalDoc / +limit);
  res.json({
    page: +page,
    limit: +limit,
    totalPages,
    products: normalizedProducts,
  });
};

export default ctrlWrapper(products);
