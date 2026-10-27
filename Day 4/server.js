import express from "express";
import rateLimitterMiddleware from "./src/middlewares/rateLimitterMiddleware.js";
import reqCounterMiddleware from "./src/middlewares/reqCounterMiddleware.js";
import { div, mul, sum } from "./src/controllers/callculatorController.js";

const app = express();



app.use(reqCounterMiddleware);
app.use(rateLimitterMiddleware);

app.get("/sum/:a/:b", sum);

app.get("/mul/:a/:b", mul);

app.get("/div/:a/:b", div);

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
