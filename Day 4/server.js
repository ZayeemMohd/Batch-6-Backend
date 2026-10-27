import express from "express";

const app = express();


const limit = 5;
let counter = 0;


const reqCounterMiddleware = (req, res, next)=>{
    counter++;
    console.log("New request recieved and counter increased to", counter)
    next()
}

// Rate limitter middleware
const rateLimitterMiddleware = (req, res, next) => {
    if(counter >= limit) {
        res.json({
            msg: "Rate limit exceeds..."
        })
    } else {
        next();
    }
}


app.get("/sum/:a/:b", reqCounterMiddleware, rateLimitterMiddleware,  (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) + parseInt(b);

  res.json({
    msg: "Sum request recieved at backend",
    sum: result,
  });
});




app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
