import express, { Request, Response } from "express";
import mailController from "../controllers/mail";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Mail Master API v1.0.0.0");
});

router.get("/mail/send", mailController.sendMail);

router.get("/mail", (req: Request, res: Response) => {
  res.render("index.html");
});
