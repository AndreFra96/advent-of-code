import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const regex = /mul\(\d+,\d+\)/g

const match = [...input.matchAll(regex)]

const values = match.map(m => m[0])

let total = 0;
for (const value of values) {
    const result = evaluateExpression(value)
    console.log(value, result)
    total += result;
}

console.log("Totale:", total)

function evaluateExpression(exp) {
    const [op, rest] = exp.split("(")
    const [firstValue, secondValue] = rest.replace(")", "").split(",")
    switch (op) {
        case 'mul':
            return parseInt(firstValue) * parseInt(secondValue)
        default:
            console.error("Invalid op", op)
            return 0;
    }
}