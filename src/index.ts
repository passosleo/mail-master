import "dotenv/config";
import express, { Express } from "express";
import { router } from "./router/index";

const app: Express = express();

app.use(express.json());
app.use(router);

app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const port: number = Number(process.env.PORT) ?? 3000;

app
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.log("Failed to start server. Error: " + err);
  });
