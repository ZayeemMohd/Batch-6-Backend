// const {sum, sub, mul, div} = require("./calculator.js");

// let result = sum(1, 5)
// console.log(result)

import {sum} from "./calculator.js";
// const {sum} = require("./calculator.js")

let result = sum(1, 5)
console.log(result)

// let num1 = Number(process.argv[2])
// let operator = process.argv[3]
// let num2 = Number(process.argv[4])


// if(operator === "+"){
//     console.log(num1 + num2)
// } else if(operator === "-"){
//     console.log(num1 - num2)
// } else if(operator === "*"){
//     console.log(num1 * num2)
// } else if(operator === "/"){
//     console.log(num1 / num2)
// } else {
//     console.log("wrong operator provided...")
// }