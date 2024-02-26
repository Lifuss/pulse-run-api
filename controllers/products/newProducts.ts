import { Request, Response } from 'express';
import { Product } from '../../models/products';
import ctrlWrapper from '../../utils/ctrlWrapper';

const getNewProducts = async (req: Request, res: Response) => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(15);
  res.status(200).json(products);
};

export default ctrlWrapper(getNewProducts);
