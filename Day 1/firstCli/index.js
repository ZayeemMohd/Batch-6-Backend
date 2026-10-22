const fs = require("fs");

const command = process.argv[2];
const filePath = process.argv[3];

const data = fs.readFileSync(filePath, "utf8");

if (command === "words") {
  wordCounter();
} else if (command === "letters") {
  letterCounter();
}

function wordCounter() {
  const wordCount = data.split(" ").length - 1;
  console.log("The number of words in this file:", wordCount);
}

function letterCounter() {
  const count = data.length;
  console.log("The number of letters in this file:", count);
}
