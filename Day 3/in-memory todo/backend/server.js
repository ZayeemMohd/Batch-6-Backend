import express from "express";

const app = express();

// json parser (parsing the json from request body (client))
app.use(express.json());

// in-memory
const todoArr = [];

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

  res.json({
    msg: "New Todo Added Successfully",
  });
});

// 3. PUT handler (CRUD: Update)
app.put("/todo", (req, res) => {
  // let old_todo = req.body.old_todo;
  // let new_todo = req.body.new_todo;

  const { old_todo, new_todo } = req.body;

  const targetElementIndex = todoArr.indexOf(old_todo);

  todoArr.splice(targetElementIndex, 1, new_todo);

  res.json({
    msg: "Todo updated successfully...",
  });
});

// 4. DELETE handler (CRUD: Delete)
app.delete("/todo", (req, res) => {
  const { target_todo } = req.body;

  const targetElementIndex = todoArr.indexOf(target_todo);

  todoArr.splice(targetElementIndex, 1);

  res.json({
    msg: "Todo Deleted Successfully",
  });
});

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
