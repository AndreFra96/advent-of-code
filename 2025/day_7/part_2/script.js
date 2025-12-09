import { assert } from "console";
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
                    //timelines a sinistra dello splitter, ha già il valore della cella
                    //sopra di esso perchè siamo già passati dalla cella a sinistra di questa
                    //devo quindi prendere il valore della cella di sinistra e aggiungere 
                    //quello che c'è sopra allo splitter
                    const countLeft = cellsPathCount[i][j - 1] ?? 0
                    cellsPathCount[i][j - 1] = countLeft + countUpper
                    grid[i][j - 1] = '|'
                }

                if (grid[i]?.[j + 1]) {
                    //Il totale a destra dello splitter a questo punto è ancora zero perchè
                    //non ci siamo ancora passati, utilizzo quindi l'elemento sopra all'elemento 
                    //a destra dello splitter per calcolare le timeline del percorso aggiungendo quello
                    //che c'è sopra allo splitter
                    assert((cellsPathCount[i][j + 1] ?? 0) == 0, "Count right on splitter should always be zero")
                    const countUpperRigth = cellsPathCount[i - 1][j + 1]
                    cellsPathCount[i][j + 1] = countUpper + countUpperRigth
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
