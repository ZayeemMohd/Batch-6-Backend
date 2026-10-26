import express from "express";

const app = express();

app.get("/sum", (req, res) => {
  const { a, b } = req.query;
  console.log(typeof a);

  let result = Number(a) + Number(b);

  res.json({
    msg: "sum request recieved on server",
    sum: result,
  });
});

app.get("/mul/:a/:b", (req, res) => {
  const { a, b } = req.params;

  let result = parseInt(a) * parseInt(b);

  res.json({
    msg: "mul request recieved on server",
    mul: result,
  });
});

app.get("*path", (req, res) => {
  res.json({
    msg: "this route doesn't exist",
  });
});

app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
