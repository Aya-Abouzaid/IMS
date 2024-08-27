import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import Env from '../../config';

const { SENDER_EMAIL, SENDER_PASSWORD } = Env;

const generateEmail = async (emailData: any, emailTemplate: string) => {
  const templateFile = fs.readFileSync(`public/emails/${emailTemplate}.hbs`, 'utf8');
  const template = handlebars.compile(templateFile);
  return template(emailData);
};

const sendEmail = async (emailAddresses: any, emailData: any) => {
  // Create a Nodemailer transporter
  const transporter: Transporter = nodemailer.createTransport({
    // Add your SMTP configuration here
    service: 'gmail',
    // host: 'smtp.office365.com',
    port: 587,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL,
    to: emailAddresses.to,
    subject: emailData.subject,
    cc: emailAddresses.cc,
    html: emailData.html,
  };

  await transporter.sendMail(mailOptions);
};

export { generateEmail, sendEmail };
