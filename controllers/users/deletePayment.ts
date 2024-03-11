import { Response } from 'express';
import User from '../../models/user';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { CustomRequest } from '../../types/express';

const deletePayment = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;
  const { paymentId } = req.params;

  const user = await User.findById(_id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const cardIndex = user.payment.findIndex(
    (card) => card._id && card._id.toString() === paymentId,
  );
  if (cardIndex === -1) {
    res.status(404).json({ message: 'Card not found' });
    return;
  }

  user.payment.splice(cardIndex, 1);

  await user.save();

  res.status(204).end();
};

export default ctrlWrapper(deletePayment);
