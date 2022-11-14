import nodemailer, { SendMailOptions, TransportOptions } from "nodemailer";
import config from "../config/config.dev";

const transporter = nodemailer.createTransport(
  config.email as TransportOptions
);

async function mailSender(options: SendMailOptions) {
  try {
    const info = await transporter.sendMail(options);
    return info;
  } catch (err) {
    throw new Error("Failed to send mail. Error: " + err);
  }
}

export default mailSender;
