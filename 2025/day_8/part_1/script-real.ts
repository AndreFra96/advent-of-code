import fs from "fs";
import { JunctionBox } from "./lib/JunctionBox";
import { Playground } from "./lib/Playground";

const input = fs.readFileSync('./input.txt', 'utf-8')

const boxes = input.split("\n").map((row) => {
    const coord = row.split(",").map(Number)
    return new JunctionBox(coord[0], coord[1], coord[2])
})

const playground = new Playground(boxes)
playground.elaborateBoxesDistances()

for (let i = 0; i < 1000; i++) {
    let couple = playground.boxCoupleAt(i)
    if (!couple) {
        console.error("undefined couple")
        break;
    }
    if (playground.sameCircuit(couple.box1, couple.box2)) {
        continue
    }
    playground.connect(couple.box1, couple.box2)
}

console.log("Final circuits")
console.log(playground.toString())

console.log("Largest multiplication:", playground.largestMultiplication())
