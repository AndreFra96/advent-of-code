import fs from "fs";
import { Machine } from "./lib/Machine";
const input = fs.readFileSync('./input-example.txt', 'utf-8');
const ligthsRegex = /\[(\.|#)+\]/g;
const buttonsRegex = /\((\d+|,)+\)/g;
const joltageRegex = /\{(\d+|,)+\}/g;
const machines = [];
input.split('\n').forEach(line => {
    const lightsMatch = line.match(ligthsRegex);
    const buttonsMatch = line.match(buttonsRegex);
    const joltageMatch = line.match(joltageRegex);
    const ligths = lightsMatch[0].replace("[", '').replace("]", "").split("");
    const buttons = buttonsMatch.map(button => button.replace("(", "").replace(")", "").split(",").map(Number));
    const joltage = joltageMatch[0].replace("{", '').replace("}", "").split(",").map(Number);
    machines.push(new Machine(ligths, buttons, joltage));
});
//# sourceMappingURL=script.js.map