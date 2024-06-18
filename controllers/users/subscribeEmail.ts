import { Request, Response } from 'express';
import sendEmail from '../../utils/sendEmail';
import Subscribe from '../../models/subscribe';
import ctrlWrapper from '../../utils/ctrlWrapper';
import dotenv from 'dotenv';

dotenv.config();

const { FRONTEND_URL } = process.env;

const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
    <title>Thank you for subscribing</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="width: 80%; margin: auto;">
        <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
            <h1>Thank you for subscribing!</h1>
        </div>
        <div style="margin: 20px;">
            <p>We appreciate your interest in our newsletter. As a token of our gratitude, please use the following promo code to get a 10% discount on your next purchase:</p>
            <h2>PROMO CODE: SUBSCRIBE</h2>
        </div>
        <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
            <a href="${FRONTEND_URL}">Visit our website</a>
        </div>
    </div>
</body>
</html>
`;

const subscribeEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const existEmail = await Subscribe.findOne({ email });

  if (!existEmail) {
    const mail = {
      to: email,
      subject: 'Thank you for subscribing!',
      html: htmlEmail
    };
    await sendEmail(mail);

    await Subscribe.create({ email });

    res.status(201).json({ message: 'Email has been sent successfully!' });
  }
  res.status(409).json({ message: 'User with that email already subscribed!' });
};

export default ctrlWrapper(subscribeEmail);
