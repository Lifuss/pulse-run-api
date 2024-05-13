import { Request, Response } from 'express';
import Order from '../../models/orders';
import { TOrder } from '../../types/express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import PromoCode from '../../models/promoCodes';
import Mailing from '../../models/mailing';
// import { Types } from 'mongoose';

const createOrder = async (req: Request, res: Response) => {
  const orderBody = req.body as TOrder;

  if (orderBody.promoCode && !orderBody.userId) {
    res
      .status(400)
      .json({ message: 'You need to be logged in to use promo code' });
    return;
  }

  // Check promo code validation if successful user adds to usedBy array for next iterations of checking
  if (orderBody.promoCode && orderBody.userId) {
    const promoCodeDoc = await PromoCode.findOne({
      code: orderBody.promoCode,
    });
    if (!promoCodeDoc) {
      res
        .status(400)
        .json({ message: 'Promo code with this code does not exist' });
      return;
    }
    if (promoCodeDoc.isActive === false) {
      res.status(400).json({ message: 'Promo code is not active' });
      return;
    }
    if (promoCodeDoc.expireDate < new Date()) {
      res.status(400).json({ message: 'Promo code is expired' });
      return;
    }

    // Simplify the code by removing the check for the user for development purposes
    // if (promoCodeDoc.usedBy.includes(new Types.ObjectId(orderBody.userId))) {
    //   res.status(400).json({ message: 'Promo code is already used' });
    //   return;
    // }
    // await PromoCode.findByIdAndUpdate(promoCodeDoc._id, {
    //   $push: { usedBy: orderBody.userId },
    // });
    orderBody.promoCode = promoCodeDoc._id;
  }
  if (orderBody.isMailing) {
    await Mailing.create({
      email: orderBody.email,
      name: orderBody.name,
    });
  }

  const order = await Order.create(orderBody);
  if (!order) {
    res
      .status(500)
      .json({ message: 'Order creation failed, order was not created' });
  }
  if (orderBody.userId) {
    await User.findByIdAndUpdate(orderBody.userId, {
      $push: { buyHistory: order._id },
    });
  }

  res.status(201).json(order);
};

export default ctrlWrapper(createOrder);
