import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { TodoModel, UserModel } from "./utils/db.js";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["token"];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    res.json({
      msg: "invalid token...!",
    });
  }

  // creating a new key-property pair in object
  req.userId = payload.userId;
  next();
};

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

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await UserModel.findOne({
    username: username,
    password: password,
  });

  if (foundUser == null) {
    res.status(301).json({
      msg: "invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      userId: foundUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "login successfully...",
    token,
  });
});

// TODO

app.use(authMiddleware);

app.get("/todo",async  (req, res) => {
  const userId = req.userId;

  const data = await TodoModel.find({
    userId
  })

  res.json({
    msg: "todo fetched successfully",
    data
  })

});

app.post("/todo", async (req, res) => {
  const { todo_name, isDone } = req.body;
  let userId = req.userId;

  let feedback = await TodoModel.create({ userId, todo_name, isDone });

  res.json({
    msg: "todo added successfully...",
    feedback,
  });
});

app.put("/todo", (req, res) => {});

app.delete("/todo", (req, res) => {});

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
