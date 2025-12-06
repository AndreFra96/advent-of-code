import fs from "fs";

const input = fs.readFileSync('./input.txt', 'utf-8')

const grid = input.split("\n").map((row) => {
    return row.split(" ").filter(i => i != '')
})
console.log(grid)

const operationsCount = grid[0]?.length ?? 0;
const results = [];
for (let col = 0; col < operationsCount; col++) {
    let operation = grid[grid.length - 1][col]
    let result = operation == '*' ? 1 : 0;
    for (let row = grid.length - 2; row >= 0; row--) {
        switch (operation) {
            case '*':
                result *= parseInt(grid[row][col])
                break;
            case '+':
                result += parseInt(grid[row][col])
                break;
            default:
                console.error("Operazione sconosciuta", operation)
        }
    }
    results.push(result)
}
console.log("risultati:", results)
console.log("somma", results.reduce((a, b) => a + b, 0))