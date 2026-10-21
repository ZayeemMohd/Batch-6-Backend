const fs = require("fs");
const path = require("path")

let finalPath = path.join(__dirname, "data", "message.txt")

// const data = fs.readFileSync(finalPath, "utf8");

// console.log(data)

let data = "Hello you are hacked"
fs.writeFileSync(finalPath, data, 'utf8');