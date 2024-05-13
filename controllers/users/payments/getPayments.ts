import { Response } from 'express';
import ctrlWrapper from '../../../utils/ctrlWrapper';
import { CustomRequest, IUser } from '../../../types/express';

const getPayment = async (req: CustomRequest, res: Response) => {
  const { payment } = req.user as IUser;
  const { cardNumber = '' } = req.query as { cardNumber: string };

  let card;
  if (cardNumber) {
    card = payment.filter((card) =>
      new RegExp(cardNumber).test(card.cardNumber),
    );
  } else {
    card = payment;
  }

  res.json(card);
};

export default ctrlWrapper(getPayment);
