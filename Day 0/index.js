// import fs from "fs";
import fs from "fs/promises"


async function getData(){
    const data = await fs.readFile("/Users/zayeemmohd/Desktop/newFile.txt", "utf8")
    console.log(data)
}

getData()

console.log("hello world")

// fs.readFileSync()
// fs.readFile()



// fs.readFile("/Users/zayeemmohd/Desktop/newFile.txt", "utf8" ,(err, data)=>{
//     console.log(data)
// })

// const data = fs.readFileSync("/Users/zayeemmohd/Desktop/newFile.txt", "utf8")

// console.log(data)

// console.log("hello world")