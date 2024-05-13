import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import PromoCode from '../../models/promoCodes';
// import { IUser } from '../../types/express';
// import { Types } from 'mongoose';

const checkPromoCode = async (req: Request, res: Response) => {
  // const { _id } = req.user as IUser;

  const promoCodeDoc = await PromoCode.findOne({
    code: req.params.code,
  });

  if (!promoCodeDoc) {
    res.status(404).send('Invalid promo code');
    return;
  }
  if (promoCodeDoc.isActive === false) {
    res.status(400).send('Promo code is not active');
    return;
  }
  if (promoCodeDoc.expireDate < new Date()) {
    res.status(400).send('Promo code is expired');
    return;
  }

  // Simplify the code by removing the check for the user for development purposes
  // if (promoCodeDoc.usedBy.includes(new Types.ObjectId(_id))) {
  //   res.status(400).send('Promo code is already used');
  //   return;
  // }
  res.status(200).json({ isValid: true, discount: promoCodeDoc.discount });
};

export default ctrlWrapper(checkPromoCode);
