const fs = require('fs');
const path = require("path")

const finalPath = path.join(__dirname, "data", "notes.txt")

const data = fs.readFileSync(finalPath, "utf8")

const count = data.length

console.log("File have", count, "Characters.")