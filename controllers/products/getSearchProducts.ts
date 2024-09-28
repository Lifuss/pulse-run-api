import { Request, Response } from 'express';
import { Product } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';

const getSearchProducts = async (req: Request, res: Response) => {
  const { name, limit = 15, page = 1 } = req.query;

  if (!name) {
    requestError(400, 'Name is required!');
    return;
  }

  const nameParts = String(name).trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) {
    requestError(400, 'Invalid search query!');
    return;
  }

  const searchQuery = {
    $and: nameParts.map((part) => ({
      name: { $regex: part, $options: 'i' },
    })),
  };

  const products = await Product.find(searchQuery)
    .limit(Number(limit))
    .skip(Number(limit) * (Number(page) - 1));

  const totalDoc = await Product.countDocuments(searchQuery);
  const totalPages = Math.ceil(totalDoc / Number(limit));

  res.json({ page: Number(page), limit: Number(limit), totalPages, products });
};

export default ctrlWrapper(getSearchProducts);
