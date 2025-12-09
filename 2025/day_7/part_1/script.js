import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const grid = input.split("\n").map(r => r.split(""))

let splittersCount = 0;

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        const currentValue = grid[i][j]
        const upperValue = grid[i - 1]?.[j]

        if (upperValue != 'S' && upperValue != '|') continue;

        switch (currentValue) {
            case '.':
                grid[i][j] = '|'
                break;
            case '^':
                splittersCount++
                if (grid[i]?.[j - 1]) {
                    grid[i][j - 1] = '|'
                }
                if (grid[i]?.[j + 1]) {
                    grid[i][j + 1] = '|'
                }
                break;
        }
    }
}


const output = grid.map((col) => col.join("")).join("\n")

console.log(output)
console.log(splittersCount, "split")