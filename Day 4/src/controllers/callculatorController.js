export const sum = (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) + parseInt(b);

  res.json({
    msg: "Sum request recieved at backend",
    sum: result,
  });
};

export const mul = (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) * parseInt(b);

  res.json({
    msg: "Multiplication request recieved at backend",
    mul: result,
  });
};

export const div = (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) / parseInt(b);

  res.json({
    msg: "Division request recieved at backend",
    div: result,
  });
};
