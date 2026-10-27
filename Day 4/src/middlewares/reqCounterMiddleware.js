const reqCounterMiddleware = (req, res, next) => {
  counter++;
  console.log("New request recieved and counter increased to", counter);
  next();
};

export default reqCounterMiddleware;