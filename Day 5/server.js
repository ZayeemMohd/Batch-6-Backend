import express from "express";

const app = express();

const usersArr = [];

app.use(express.json());

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";

  for (let i = 0; i < 32; i++) {
    // 0 - 36 options[35]
    token = token + options[Math.floor(Math.random() * options.length)];
  }

  return token;
};

const authMiddleware = (req, res, next) => {
  const userToken = req.headers["token"];


  // db call for token verification 
  const verifiedUser = usersArr.find((userObj) => {
    if (userToken === userObj.token) {
      return true;
    } else {
      return false;
    }
  });

  if (verifiedUser) {
    req.verifiedUser = verifiedUser;
    next();
  } else {
    res.json({
      msg: "invalid token...!",
    });
  }
};

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  let userObj = {
    username,
    password,
    email,
  };

  usersArr.push(userObj);
  console.log(usersArr);

  res.json({
    msg: "user created successfully...",
    userObj,
  });
});

app.post("/signin", (req, res) => {
  let { username, password } = req.body;

  const foundUser = usersArr.find((user) => {
    if (user.username === username && user.password === password) {
      return true;
    } else {
      return false;
    }
  });

  if (!foundUser) {
    res.json({
      msg: "invalid username or password",
    });
  }

  const token = generateToken();

  foundUser.token = token;

  console.log(usersArr);

  res.json({
    msg: "signed in successfull",
    token,
  });
});

app.use(authMiddleware);

app.get("/courses", (req, res) => {
  res.json({
    data: {
      courseId: "72",
      courseName: "full stack development",
      material: "MERN",
    },
  });
});

app.get("/me", (req, res) => {
  let { verifiedUser } = req;

  res.json({
    msg: "We Got Your data",
    data: verifiedUser,
  });
});

app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
