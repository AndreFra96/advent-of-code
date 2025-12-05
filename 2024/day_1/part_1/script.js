import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8")

const rows = input.split("\n")

let leftList = [];
let rightList = [];

for (const row of rows) {
    const [left, right] = row.split("   ");
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
}

leftList.sort()
rightList.sort()

let totalDiff = 0;
for (let i = 0; i < leftList.length; i++) {
    totalDiff += Math.abs(rightList[i] - leftList[i])
}
console.log("Differenza totale:", totalDiff)