import { Request, Response } from 'express';
import { Product } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';

const products = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const totalDoc = await Product.countDocuments();
  const totalPages = Math.ceil(totalDoc / limit);
  res.json({ page, limit, totalPages, products });
};

export default ctrlWrapper(products);
