import { createTransport } from 'nodemailer';
import env from './env.config';

const transporter = createTransport({
  port: 465,
  host: env.SMTP_HOST,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
  secure: true,
});

export default transporter;
