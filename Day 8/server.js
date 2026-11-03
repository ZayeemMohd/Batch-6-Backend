import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { todoModel, userModel } from "./utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["token"];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      res.json({
        msg: "invalid token / signin first to get data...",
      });
    }

    req.userId = payload.userId;

    next();
  } catch (error) {
    res.json({
      msg: "token must be provided, it should not be empty",
    });
  }
};

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected successfully....");
  })
  .catch((err) => {
    console.log("error while connecting db..:: ", err);
  });

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const alreadyExistsUser = userModel.findOne({
    username: username,
  });

  if (alreadyExistsUser) {
    res.json({
      msg: "username already exists...!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const feedback = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json({
    msg: "signup request received...",
    feedback,
  });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await userModel.findOne({
    username,
  });

  if(foundUser == null){
    res.json({
        msg: 'user not found..!'
    })
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) {
    res.json({
      msg: "invalid username or passoword",
    });
  }

  const token = jwt.sign(
    {
      userId: foundUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "signed in successfull...",
    token,
  });
});

// todo routes

app.use(authMiddleware);

app.get("/todo", async (req, res) => {
  const userId = req.userId;

  const data = await todoModel.find({ userId });

  res.json({
    msg: "Available Todos",
    data,
  });
});

app.post("/todo", async (req, res) => {
  const { todo_name, isDone } = req.body;
  let userId = req.userId;

  let feedback = await todoModel.create({ userId, todo_name, isDone });

  res.json({
    msg: "todo added successfully...",
    feedback,
  });
});

app.put("/todo", async (req, res) => {
  const { old_todo_name, new_todo_name, old_isDone, new_isDone } = req.body;

  const userId = req.userId;

  const feedback = await todoModel.findOneAndUpdate(
    { userId: userId, todo_name: old_todo_name, isDone: old_isDone },
    {
      userId: userId,
      todo_name: new_todo_name,
      isDone: new_isDone,
    },
  );

  res.json({
    msg: "todo updated successfully",
    feedback,
  });
});

app.delete("/todo/:id", async (req, res) => {
  let userId = req.userId;

  const { id } = req.params;

  const feedback = await todoModel.deleteOne({
    _id: id,
    userId: userId,
  });

  res.json({
    msg: "todo deleted succssfully...",
    feedback,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT);
});
