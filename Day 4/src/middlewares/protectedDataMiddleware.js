const authenticateMiddleware = (req, res, next) => {
  
  if (req.headers["secret-key"] == "abcd123") {
    next();
  } else {
    res.json({
      msg: "forbidden, incorrect key!...",
    });
  }
};

export default authenticateMiddleware;