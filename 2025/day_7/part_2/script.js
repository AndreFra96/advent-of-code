import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const grid = input.split("\n").map(r => r.split(""))

let splittersCount = 0;
const cellsPathCount = [];

for (let i = 0; i < grid.length; i++) {
    cellsPathCount[i] = new Array(grid[i].length).fill(0)
    for (let j = 0; j < grid[i].length; j++) {
        const currentValue = grid[i][j]
        const upperValue = grid[i - 1]?.[j]

        if (upperValue == 'S') {
            grid[i][j] = '|'
            cellsPathCount[i][j] = 1;
            continue;
        }

        if (upperValue != '|') continue;

        switch (currentValue) {
            case '.':
                grid[i][j] = '|'
                cellsPathCount[i][j] = cellsPathCount[i - 1]?.[j] ?? 1;
                break;
            case '^':
                splittersCount++

                //timelines sopra allo splitter
                const countUpper = cellsPathCount[i - 1][j]

                if (grid[i]?.[j - 1]) {
                    //timelines a sinistra dello splitter
                    const countLeft = cellsPathCount[i][j - 1] ?? 0
                    cellsPathCount[i][j - 1] = countLeft + countUpper
                    grid[i][j - 1] = '|'
                }

                if (grid[i]?.[j + 1]) {
                    //timelines a destra dello splitter
                    const countRigth = cellsPathCount[i][j + 1] ?? 0
                    //timelines in alto a destra dello splitter
                    //a sinistra non ho questo conteggio perchè viene già incrementato al giro precedente
                    //a destra invece non sono ancora passato quando trovo lo splitter
                    const countUpperRigth = cellsPathCount[i - 1][j + 1]
                    cellsPathCount[i][j + 1] = countRigth + countUpper + countUpperRigth
                    grid[i][j + 1] = '|'
                }
        }
    }
}

const debug = grid.map((row, rowIdx) => {
    return row.map((cell, cellIdx) => {
        const count = cellsPathCount[rowIdx][cellIdx]
        if (count) return count.toString(16);
        return cell;
    }).join("")
}).join("\n")

const processedGrid = grid.map((col) => col.join("")).join("\n")

console.log(`${processedGrid}\n\n${debug}\n`)
console.log(splittersCount, "split")
console.log(cellsPathCount[cellsPathCount.length - 1].reduce((a, b) => a + b, 0), "timelines")
