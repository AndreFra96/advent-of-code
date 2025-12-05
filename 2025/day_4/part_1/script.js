import fs from "fs"


const input = fs.readFileSync('./input.txt', 'utf-8')

const griglia = input.split("\n").map(riga => riga.split(""))


const prima = griglia.map(row => row.join("")).join("\n")
let accessibili = 0;
for (let i = 0; i < griglia.length; i++) {
    const riga = griglia[i];
    for (let j = 0; j < riga.length; j++) {
        const cella = riga[j];
        const l = griglia[i][j - 1]
        const r = griglia[i][j + 1]
        const t = griglia[i - 1]?.[j]
        const b = griglia[i + 1]?.[j]
        const tl = griglia[i - 1]?.[j - 1]
        const tr = griglia[i - 1]?.[j + 1]
        const bl = griglia[i + 1]?.[j - 1]
        const br = griglia[i + 1]?.[j + 1]
        const rolls = [l, r, t, b, tl, tr, bl, br].filter((roll) => roll == '@' || roll == 'X')
        if (cella == '@' && rolls.length < 4) {
            griglia[i][j] = 'X'
            accessibili++
        }
    }
}

const dopo = griglia.map(row => row.join("")).join("\n")
console.log(prima, "\n\n", dopo)
console.log(accessibili, "accessibili")