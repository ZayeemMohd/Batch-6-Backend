import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState(null);

  async function getTodoFn() {
    const response = await fetch("http://localhost:8080/todo");
    const data = await response.json();

    console.log(data.todos);
    setTodo(data.todos);
  }

  async function addTodoFn() {
    const response = await fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newTodo: input,
      }),
    });

    const data = await response.json();
    console.log(data.msg);

    alert(data.msg)

    getTodoFn();
    setInput("");
  }

  return (
    <>
      <div className="bg-amber-700 text-white text-center m-20 rounded-xl">
        Full Stack TODO APP:
      </div>
      <div className="flex justify-center align-center gap-20">
        <input
          className="bg-slate-400 py-5 px-10 rounded-xl"
          type="text"
          placeholder="Enter your todo:"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          className="bg-amber-500  py-5 px-10 rounded-xl"
          onClick={addTodoFn}
        >
          Add Todo
        </button>
        <button
          className="bg-green-500  py-5 px-10 rounded-xl"
          onClick={getTodoFn}
        >
          Get Todos / Refresh
        </button>
      </div>
      <div className="flex my-20 justify-center align-center gap-20">
        {todo === null ? (
          <div>No Todo Available... / try Refresh</div>
        ) : (
          <div>
            <ul>
              {todo.map((elem) => {
                return <li>{elem}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
