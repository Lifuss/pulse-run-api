import { Request, Response } from 'express';
import sendEmail from '../../utils/sendEmail';
import Subscribe from '../../models/subscribe';
import ctrlWrapper from '../../utils/ctrlWrapper';

const subscribeEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const existEmail = await Subscribe.findOne({ email });

  if (!existEmail) {
    const mail = {
      to: email,
      subject: 'Subscribed and got discount on our products!',
      html: '<h1>You have subscribed to our newsletter and got 10% of discount</h1><a href="http://localhost:3020">Go to our website</a>',
    };
    await sendEmail(mail);

    await Subscribe.create({ email });

    res.status(201).json({ message: 'Email has been sent successfully!' });
  }
  res.status(409).json({ message: 'User with that email already subscribed!' });
};

export default ctrlWrapper(subscribeEmail);
