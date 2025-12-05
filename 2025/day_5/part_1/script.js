import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8');

const splitted = input.split("\n\n")
const ranges = splitted[0].split("\n")
const ingredients = splitted[1].split("\n")

let freshCount = 0;
for (const ingredient of ingredients) {
    const ingredientInt = parseInt(ingredient)
    for (const range of ranges) {
        const [start, end] = range.split("-").map(Number)
        if (ingredientInt >= start && ingredientInt <= end) {
            freshCount++
            break;
        }
    }
}

console.log(freshCount, "prodotti freschi")