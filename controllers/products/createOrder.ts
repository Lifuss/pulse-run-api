import { Request, Response } from 'express';
import Order from '../../models/orders';
import { TOrder } from '../../types/express';

const createOrder = async (req: Request, res: Response) => {
  const orderBody = req.body as TOrder;

  const order = await Order.create(orderBody);
};

export default createOrder;
