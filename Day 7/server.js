import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { UserModel } from "./utils/db.js";
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY...");
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTING DB:: ", err);
  });

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const feedback = await UserModel.create({ username, password, email });

  res.json({
    msg: "user registered successfully in database",
    feedback,
  });
});

app.post("/signin", (req, res) => {});

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
