import fs from "fs";

const input = fs.readFileSync('./input.txt', 'utf-8')

const rows = input.split("\n")

let leftList = [];
let rightList = [];

for (const row of rows) {
    const [left, right] = row.split("   ");
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
}

let totalCount = 0;
for (const leftListItem of leftList) {
    console.log(leftListItem)
    const rightListCount = rightList.filter(rightListItem => rightListItem == leftListItem).length
    totalCount += leftListItem * rightListCount
}
console.log("Total count:", totalCount)