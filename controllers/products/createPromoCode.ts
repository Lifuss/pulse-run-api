import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import PromoCode from '../../models/promoCodes';

type PromoCode = {
  code: string;
  discount: number;
  expireDate: Date;
  //  "expireDate": "2022-09-01T00:00:00.000Z"
};

const createPromoCode = async (req: Request, res: Response) => {
  const body = req.body as PromoCode;
  const promoCode = await PromoCode.create(body);
  res.status(201).json(promoCode);
};

export default ctrlWrapper(createPromoCode);
