import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { Product } from '../../models/products';
import mongoose from 'mongoose';

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  const product = await Product.findById(id)
    .populate('categories.brand')
    .populate('categories.color')
    .populate('categories.size');

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  res.json(product);
};

export default ctrlWrapper(getById);
