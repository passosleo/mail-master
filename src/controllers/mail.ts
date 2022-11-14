import { Request, Response } from "express";
import mailService from "../services/mail";

class MailController {
  public async sendMail(req: Request, res: Response) {
    try {
      const response = await mailService.sendMail();
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default new MailController();
