const requestLoggerMiddleware = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  console.log("---------- New Request ----------");
  console.log("Method is: ", req.method);
  console.log("Route is: ", req.url);
  console.log("Time is: ", time)

  next();
};

export default requestLoggerMiddleware;