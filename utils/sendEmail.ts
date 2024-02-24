import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY as string);

const sendEmail = async (data: EmailData) => {
  const mail = { ...data, from: EMAIL_FROM as string };
  await sgMail.send(mail);
  return true;
};

export default sendEmail;
