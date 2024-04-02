import { Request, Response } from 'express';
import { Product } from '../../models/products';

const updatePrices = async (req: Request, res: Response) => {
  const products = await Product.aggregate([
    {
      $addFields: {
        price: {
          $cond: {
            if: { $eq: ['$sale', 0] },
            then: '$basePrice',
            else: {
              $subtract: [
                '$basePrice',
                { $multiply: ['$basePrice', { $divide: ['$sale', 100] }] },
              ],
            },
          },
        },
      },
    },
  ]);

  const bulkOps = products.map((product) => ({
    updateOne: {
      filter: { _id: product._id },
      update: { price: product.price },
    },
  }));

  await Product.bulkWrite(bulkOps);

  res.json({ message: 'Prices updated successfully' });
};

export default updatePrices;
