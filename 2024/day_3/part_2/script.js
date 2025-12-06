import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const regex = /(mul|don't|do)\((\d+,\d+)?\)/g

const match = [...input.matchAll(regex)]

const values = match.map(m => m[0])

let total = 0;
let enabled = true;
for (const value of values) {
    const result = evaluateExpression(value)
    console.log(value, result)
    total += result;
}

console.log("Totale:", total)

function evaluateExpression(exp) {
    const [op, rest] = exp.split("(")
    switch (op) {
        case 'mul':
            if (!enabled) return 0;
            const [firstValue, secondValue] = rest.replace(")", "").split(",")
            return parseInt(firstValue) * parseInt(secondValue)
        case 'do':
            enabled = true
            return 0;
        case "don't":
            enabled = false
            return 0;
        default:
            console.error("Invalid op", op)
            return 0;
    }
}