import { Request, Response } from 'express';
import Order from '../../models/orders';
import { TOrder } from '../../types/express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import PromoCode from '../../models/promoCodes';
import Mailing from '../../models/mailing';
import jwt from 'jsonwebtoken';

const createOrder = async (req: Request, res: Response) => {
  const orderBody = req.body as TOrder;
  const { authorization = '' } = req.headers;
  const [, token] = authorization.split(' ');

  if (orderBody.promoCode) {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      await User.findByIdAndUpdate(id, {
        $push: { buyHistory: order._id },
      });
    }
  }

  res.status(201).json(order);
};

export default ctrlWrapper(createOrder);
