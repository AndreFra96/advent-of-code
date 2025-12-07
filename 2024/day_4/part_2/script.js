import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const grid = input.split("\n").map((row) => {
    return row.split("").filter(i => i != '')
})

let validCount = 0;
for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
        if (grid[row][col] == 'A') {
            const tl = grid[row - 1]?.[col - 1]
            const tr = grid[row - 1]?.[col + 1]
            const bl = grid[row + 1]?.[col - 1]
            const br = grid[row + 1]?.[col + 1]
            const firstDiagonalOK = (tl == 'M' && br == 'S') || (tl == 'S' && br == 'M')
            const secondDiagonalOK = (bl == 'M' && tr == 'S') || (bl == 'S' && tr == 'M')
            if (firstDiagonalOK && secondDiagonalOK) {
                validCount++
            }
        }
    }
}
console.log("Validi", validCount)