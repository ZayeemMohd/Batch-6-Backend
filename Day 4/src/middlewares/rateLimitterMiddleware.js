import { counter, limit } from "../utils/globalVariables.js";

// Rate limitter middleware
const rateLimitterMiddleware = (req, res, next) => {
  if (counter >= limit) {
    res.json({
      msg: "Rate limit exceeds...",
    });
  } else {
    next();
  }
};

export default rateLimitterMiddleware;