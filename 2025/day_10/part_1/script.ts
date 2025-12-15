import fs from "fs"
import { Machine } from "./lib/Machine"

const input = fs.readFileSync('./input.txt', 'utf-8')

const ligthsRegex = /\[(\.|#)+\]/g
const buttonsRegex = /\((\d+|,)+\)/g
const joltageRegex = /\{(\d+|,)+\}/g

const machines: Machine[] = [];

input.split('\n').forEach(line => {
    const lightsMatch = line.match(ligthsRegex)
    const buttonsMatch = line.match(buttonsRegex)
    const joltageMatch = line.match(joltageRegex)
    const ligths = lightsMatch[0].replace("[", '').replace("]", "").split("").map(l => l == '#' ? true : false)
    const buttons = buttonsMatch.map(button => button.replace("(", "").replace(")", "").split(",").map(Number))
    const joltage = joltageMatch[0].replace("{", '').replace("}", "").split(",").map(Number)
    machines.push(new Machine(ligths, buttons, joltage))
})

let totalLen = 0;
for (const machine of machines) {
    console.log("\n", machine.toString())
    const sequence = machine.buttonsSequencesToTarget(7)
    if (sequence.length == 0) {
        console.error("Nessuna sequenza trovata")
        continue
    }
    totalLen += sequence.length
    console.log("Sequenza ottimale:", sequence.map(s => s.toString()))
}
console.log("Totale lunghezze:", totalLen)


