import nodemailer from 'nodemailer';

type SendMailData = {
  to: string;
  subject: string;
  body: string;
};

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export function useNodeMailerMailAdapter() {
  async function sendMail({ to, subject, body }: SendMailData) {
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: subject,
      html: body,
    });
  }

  return {
    sendMail,
  };
}
