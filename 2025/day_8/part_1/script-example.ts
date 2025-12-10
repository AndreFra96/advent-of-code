import fs from "fs";
import { JunctionBox } from "./lib/JunctionBox";
import { Playground } from "./lib/Playground";

const input = fs.readFileSync('./input-example.txt', 'utf-8')

const boxes = input.split("\n").map((row) => {
    const coord = row.split(",").map(Number)
    return new JunctionBox(coord[0], coord[1], coord[2])
})

const playground = new Playground(boxes)
playground.elaborateBoxesDistances()

let connections = 0;
let i = 0;

while (connections < 10) {
    let couple = playground.boxCoupleAt(i)
    i++
    if (!couple) {
        console.error("undefined couple")
        break;
    }
    if (playground.sameCircuit(couple.box1, couple.box2)) {
        connections++
        continue
    }
    playground.connect(couple.box1, couple.box2)
    connections++
}

console.log("Final circuits after", connections, "connections")
console.log(playground.toString())

console.log("Largest multiplication:", playground.largestMultiplication())
