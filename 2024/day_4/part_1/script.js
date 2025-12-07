import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const grid = input.split("\n").map((row) => {
    return row.split("").filter(i => i != '')
})

let validCount = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] == 'X') {
            //cerco una M intorno
            const t = grid[row - 1]?.[col]
            const b = grid[row + 1]?.[col]
            const l = grid[row]?.[col - 1]
            const r = grid[row]?.[col + 1]
            const tl = grid[row - 1]?.[col - 1]
            const tr = grid[row - 1]?.[col + 1]
            const bl = grid[row + 1]?.[col - 1]
            const br = grid[row + 1]?.[col + 1]
            if (t == 'M') {
                if (grid[row - 2]?.[col] == 'A') {
                    if (grid[row - 3]?.[col] == 'S') {
                        validCount++
                    }
                }
            }
            if (b == 'M') {
                if (grid[row + 2]?.[col] == 'A') {
                    if (grid[row + 3]?.[col] == 'S') {
                        validCount++
                    }
                }
            }
            if (l == 'M') {
                if (grid[row]?.[col - 2] == 'A') {
                    if (grid[row]?.[col - 3] == 'S') {
                        validCount++
                    }
                }
            }
            if (r == 'M') {
                if (grid[row]?.[col + 2] == 'A') {
                    if (grid[row]?.[col + 3] == 'S') {
                        validCount++
                    }
                }
            }
            if (tl == 'M') {
                if (grid[row - 2]?.[col - 2] == 'A') {
                    if (grid[row - 3]?.[col - 3] == 'S') {
                        validCount++
                    }
                }
            }
            if (tr == 'M') {
                if (grid[row - 2]?.[col + 2] == 'A') {
                    if (grid[row - 3]?.[col + 3] == 'S') {
                        validCount++
                    }
                }
            }
            if (bl == 'M') {
                if (grid[row + 2]?.[col - 2] == 'A') {
                    if (grid[row + 3]?.[col - 3] == 'S') {
                        validCount++
                    }
                }
            }
            if (br == 'M') {
                if (grid[row + 2]?.[col + 2] == 'A') {
                    if (grid[row + 3]?.[col + 3] == 'S') {
                        validCount++
                    }
                }
            }
        }
    }
}
console.log("Validi", validCount)