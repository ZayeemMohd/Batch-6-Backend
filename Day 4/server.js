import express from "express";
import rateLimitterMiddleware from "./src/middlewares/rateLimitterMiddleware.js";
import reqCounterMiddleware from "./src/middlewares/reqCounterMiddleware.js";
import { div, mul, sum } from "./src/controllers/callculatorController.js";
import requestLoggerMiddleware from "./src/middlewares/loggerMiddleware.js";

import cors from "cors";
import authenticateMiddleware from "./src/middlewares/protectedDataMiddleware.js";

const app = express();

// body parser
app.use(express.json());

// cors middleware
app.use(cors());

app.use(requestLoggerMiddleware);
app.use(reqCounterMiddleware);
app.use(rateLimitterMiddleware);

app.get("/sum/:a/:b", sum);

app.get("/mul/:a/:b", mul);

app.get("/div/:a/:b", div);

app.post("/sub", (req, res) => {
  console.log(req.body);
  const { a, b } = req.body;

  let result = parseInt(a) - parseInt(b);

  res.json({
    msg: "subtract request recieved on server",
    sub: result,
  });
});

app.use(authenticateMiddleware)

app.get("/protected-data", (req, res) => {
  res.json({
    secretData: "I love biryani",
  });
});

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
