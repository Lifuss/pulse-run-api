import { Request, Response } from 'express';
import { Product } from '../../models/products';

const updatePrices = async (req: Request, res: Response) => {
  try {
    await Product.aggregate([
      {
        $addFields: {
          price: {
            $cond: {
              if: { $eq: ['$sale', 0] },
              then: '$basePrice',
              else: {
                $ceil: {
                  $subtract: [
                    '$basePrice',
                    { $multiply: ['$basePrice', { $divide: ['$sale', 100] }] },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $out: 'products',
      },
    ]);

    res.json({ message: 'Prices updated successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating prices' });
  }
};

export default updatePrices;
