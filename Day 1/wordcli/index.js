import { program } from "commander";
import fs from "fs";

program
  .name("wordcli")
  .description("CLI application to count words, letters, lines in a file")
  .version("1.0.0");

program
  .command("letters")
  .description("Command to count letters from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("The number of letters in this file:", data.length);
  });

program
  .command("words")
  .description("Command to count words from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("The number of words in this file:", data.split(" ").length);
  });

program
  .command("lines")
  .description("Command to count lines from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    console.log(
      "The number of words in this file:",
      data.split("\n").length - 1,
    );
  });

program
  .command("all")
  .description("Command to count words, letters and lines from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");

    console.log("The number of letters in this file:", data.length);

    console.log("The number of words in this file:", data.split(" ").length);

    console.log(
      "The number of words in this file:",
      data.split("\n").length ,
    );
  });

program.parse();
