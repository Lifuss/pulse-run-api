import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import Support from '../../models/support';

const createSupportTicket = async (req: Request, res: Response) => {
  const { email, name, subject, message } = req.body;
  await Support.create({ email, name, subject, message });
  res.status(201).json({ message: 'Support ticket created successfully' });
};

export default ctrlWrapper(createSupportTicket);
