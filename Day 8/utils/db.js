import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const TodoSchema = new Schema({
  userId: ObjectId,
  todo_name: String,
  isDone: Boolean,
});

export const userModel = mongoose.model("user", UserSchema);
export const todoModel = mongoose.model("todo", TodoSchema);
