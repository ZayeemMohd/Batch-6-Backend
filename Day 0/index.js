let num1 = Number(process.argv[2])
let operator = process.argv[3]
let num2 = Number(process.argv[4])


if(operator === "+"){
    console.log(num1 + num2)
} else if(operator === "-"){
    console.log(num1 - num2)
} else if(operator === "*"){
    console.log(num1 * num2)
} else if(operator === "/"){
    console.log(num1 / num2)
} else {
    console.log("wrong operator provided...")
}