import fs from "fs";

const input = fs.readFileSync("./input.txt", 'utf-8')

const grid = input.split("\n").map((row) => row.split(""))

const buffer = [];
let total = 0

//scorro le colonne dall'ultima alla prima
for (let i = grid[0].length - 1; i >= 0; i--) {
    let columnBuffer = ''
    //scorro le righe della colonna dalla prima all'ultima
    for (let j = 0; j < grid.length; j++) {
        switch (grid[j][i]) {
            case ' ':
            case '':
                break
            case '*':
                //aggiungo il contenuto della colonna letto fino ad ora nel buffer
                buffer.push(columnBuffer)
                columnBuffer = ''
                //calcolo il prodotto degli elementi nel buffer
                total += buffer.map(Number).reduce((a, b) => a * b, 1)
                //svuoto il buffer
                buffer.length = 0
                break;
            case '+':
                //aggiungo il contenuto della colonna letto fino ad ora nel buffer
                buffer.push(columnBuffer)
                columnBuffer = ''
                //calcolo la somma degli elementi nel buffer
                total += buffer.map(Number).reduce((a, b) => a + b, 0)
                //svuoto il buffer
                buffer.length = 0
                break
            default:
                //aggiungo il carattere alla colonna
                columnBuffer += grid[j][i]
        }
    }
    //se la colonna non è vuota la aggiungo al buffer
    if (columnBuffer != '')
        buffer.push(columnBuffer)
}
console.log("Totale", total)