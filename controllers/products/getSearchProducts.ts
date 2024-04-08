import { Request, Response } from 'express';
import { Product } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';

const getSearchProducts = async (req: Request, res: Response) => {
  const { name, limit = 15, page = 1 } = req.query;

  if (!name) {
    requestError(400, 'Name is required!');
  }

  const products = await Product.find({ name: new RegExp(String(name), 'i') })
    .limit(Number(limit))
    .skip(Number(limit) * (Number(page) - 1));

  const totalDoc = await Product.countDocuments({
    name: new RegExp(String(name), 'i'),
  });
  const totalPages = Math.ceil(totalDoc / +limit);

res.json({ page: +page, limit: +limit, totalPages, products });
};

export default ctrlWrapper(getSearchProducts);
