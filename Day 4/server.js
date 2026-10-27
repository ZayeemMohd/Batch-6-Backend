import express from "express";

const app = express();

let counter = 0;


const reqCounterMiddleware = (req, res, next)=>{
    counter++;
    console.log("New request recieved and counter increased to", counter)
    next()
}


app.get("/sum/:a/:b", reqCounterMiddleware, (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) + parseInt(b);

  res.json({
    msg: "Sum request recieved at backend",
    sum: result,
  });
});


app.get("/mul/:a/:b", )

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
