import { Request, Response } from 'express';
import { Product } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';

const getNewProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  res.status(200).json(products);
};

export default ctrlWrapper(getNewProducts);
