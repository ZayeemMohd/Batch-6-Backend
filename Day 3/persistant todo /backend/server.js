import express from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(import.meta.dirname, "data", "todo.json");
const app = express();

// json parser (parsing the json from request body (client))
app.use(express.json());

// persistant
const data = fs.readFileSync(filePath, "utf8");
const todoArr = JSON.parse(data);

// ----------- /todo route -------------

// 1. GET handler (CRUD: Read)
app.get("/todo", (req, res) => {
  console.log("Get Request Recieved on /todo route...");

  res.json({
    todos: todoArr,
  });
});

// 2. POST handler (CRUD: Create)
app.post("/todo", (req, res) => {
  console.log("POST request recieved on /todo route...");

  let newTodo = req.body.newTodo;

  todoArr.push(newTodo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  res.json({
    msg: "New Todo Added Successfully",
  });
});

// 3. PUT handler (CRUD: Update)
app.put("/todo", (req, res) => {
  const { old_todo, new_todo } = req.body;

  const targetElementIndex = todoArr.indexOf(old_todo);

  todoArr.splice(targetElementIndex, 1, new_todo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  res.json({
    msg: "Todo updated successfully...",
  });
});

// 4. DELETE handler (CRUD: Delete)
app.delete("/todo", (req, res) => {
  const { target_todo } = req.body;

  const targetElementIndex = todoArr.indexOf(target_todo);

  todoArr.splice(targetElementIndex, 1);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  res.json({
    msg: "Todo Deleted Successfully",
  });
});

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
