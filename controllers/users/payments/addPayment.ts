import { Response } from 'express';
import User from '../../../models/user';
import ctrlWrapper from '../../../utils/ctrlWrapper';
import { CustomRequest } from '../../../types/express';

const addPayment = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;
  const payment = req.body;

  const user = await User.findById(_id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const cardExists = user.payment.find((card) => {
    return card.cardNumber === payment.cardNumber;
  });

  if (cardExists) {
    res.status(409).json({ message: 'Card already exists' });
    return;
  }

  user.payment.push(payment);
  await user.save();
  res.status(201).json(user.payment);
};

export default ctrlWrapper(addPayment);
