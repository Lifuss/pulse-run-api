import { Request, Response } from 'express';
import Order from '../../models/orders';
import { TOrder } from '../../types/express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import PromoCode from '../../models/promoCodes';
import Mailing from '../../models/mailing';
import jwt from 'jsonwebtoken';
// import { Types } from 'mongoose';

const createOrder = async (req: Request, res: Response) => {
  const orderBody = req.body as TOrder;
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  // if (orderBody.promoCode && !orderBody.userId) {
  //   res
  //     .status(400)
  //     .json({ message: 'You need to be logged in to use promo code' });
  //   return;
  // }

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
    const checkEmail = await Mailing.find({ email: orderBody.email });

    if (checkEmail) {
      await Mailing.findOneAndUpdate(
        { email: orderBody.email },
        { $set: { name: orderBody.name } },
      );
    } else {
      await Mailing.create({
        email: orderBody.email,
        name: orderBody.name,
      });
    }
  }

  const { isMailing, ...orderBodyWithoutMailing } = orderBody;

  const order = await Order.create(orderBodyWithoutMailing);
  if (!order) {
    res
      .status(500)
      .json({ message: 'Order creation failed, order was not created' });
  }

  if (token) {
    const secretKey: string = process.env.JWT_SECRET || 'default_secret';
    const { id } = jwt.verify(token, secretKey) as { id: string };
    const user = await User.findById(id);
    if (user) {
      await User.findByIdAndUpdate(orderBody.userId, {
        $push: { buyHistory: order._id },
      });
    }
  }

  res.status(201).json(order);
};

export default ctrlWrapper(createOrder);
