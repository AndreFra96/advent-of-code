import fs from "fs";
import { JunctionBox } from "./lib/JunctionBox";
import { JunctionBoxCouple, Playground } from "./lib/Playground";

const input = fs.readFileSync('./input-example.txt', 'utf-8')

const boxes = input.split("\n").map((row) => {
    const coord = row.split(",").map(Number)
    return new JunctionBox(coord[0], coord[1], coord[2])
})

const playground = new Playground(boxes)
playground.elaborateBoxesDistances()

let i = 0;
let lastCouple: JunctionBoxCouple | undefined = undefined;

while (playground.circuitsCount() > 1) {
    let couple = playground.boxCoupleAt(i)
    i++
    if (!couple) {
        console.error("undefined couple")
        break;
    }
    if (playground.sameCircuit(couple.box1, couple.box2)) {
        continue
    }
    lastCouple = couple
    playground.connect(couple.box1, couple.box2)
}

console.log("Ultima coppia", lastCouple)
if (lastCouple)
    console.log("Prodotto x", lastCouple?.box1.x * lastCouple?.box2.x)



// console.log(playground.toString())

// console.log("Largest multiplication:", playground.largestMultiplication())
