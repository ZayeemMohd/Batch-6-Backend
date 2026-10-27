import express from "express";
import rateLimitterMiddleware from "./src/middlewares/rateLimitterMiddleware";
import reqCounterMiddleware from "./src/middlewares/reqCounterMiddleware";
import { mul, sum } from "./src/controllers/callculatorController";

const app = express();

const limit = 5;
let counter = 0;

app.use(reqCounterMiddleware);
app.use(rateLimitterMiddleware);

app.get("/sum/:a/:b", sum);

app.get("/mul/:a/:b", mul);

app.get("/div/:a/:b", div);

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
