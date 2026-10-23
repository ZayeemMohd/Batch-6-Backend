import fs from "fs";
import path from "path";
import { program } from "commander";

program
  .name("todocli")
  .description("CLI to add, print, edit, delete your daily todos or tasks")
  .version("1.0.0");

const currentDir = import.meta.dirname;

const filePath = path.join(currentDir, "data", "todos.json");
const data = fs.readFileSync(filePath, "utf8");

const todoArr = JSON.parse(data);

program
  .command("print")
  .description("This command is used to print available todos")
  .action(() => {
    todoArr.forEach((element, index) => {
      console.log(`${index + 1}: ${element}`);
    });
  });

program
  .command("add")
  .description("This command is used to add new todo")
  .argument("<newTodo>", "This argument holds the new todo")
  .action((newTodo) => {
    todoArr.push(newTodo);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");
    console.log("Todo added");
  });

program
  .command("edit")
  .description("This command is used to edit existing todo")
  .argument("<existing_todo>", "This argument holds the new todo")
  .argument("<new_todo>", "This argument holds the new todo")
  .action((existing_todo, new_todo) => {

    const indexOfTargetElement = todoArr.indexOf(existing_todo);

    todoArr.splice(indexOfTargetElement, 1, new_todo);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

    console.log("Todo Updated Successfully::", existing_todo, "->", new_todo);
  });

program
  .command("delete")
  .description("This command is used to delete existing todo")
  .argument("<existing_todo>", "This argument holds the new todo")
  .action((existing_todo) => {
    
   const targetTodoIndex =   todoArr.indexOf(existing_todo)

   todoArr.splice(targetTodoIndex, 1)

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

    console.log("Todo Deleted Sucessfullly::", existing_todo);
  });

program.parse();
