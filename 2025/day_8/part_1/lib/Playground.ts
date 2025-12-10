import { Circuit } from "./Circuit";
import { JunctionBox } from "./JunctionBox";

type JunctionBoxCouple = { box1: JunctionBox, box2: JunctionBox, distance: number }

export class Playground {
    private boxes: JunctionBox[];
    private couplesByDistance: JunctionBoxCouple[]
    private circuits: Circuit[];

    constructor(boxes: JunctionBox[]) {
        this.boxes = boxes
        this.circuits = boxes.map(box => new Circuit([box]));
        this.couplesByDistance = [];
    }

    elaborateBoxesDistances() {
        const couples: JunctionBoxCouple[] = []
        for (let i = 0; i < this.boxes.length; i++) {
            for (let j = i + 1; j < this.boxes.length; j++) {
                if (j == i) continue;
                const firstBox = this.boxes[i];
                const secondBox = this.boxes[j];
                couples.push({
                    box1: firstBox,
                    box2: secondBox,
                    distance: firstBox.distanceFrom(secondBox)
                })
            }
        }
        couples.sort((a, b) => a.distance - b.distance)
        this.couplesByDistance = couples
    }

    boxCoupleAt(index: number): JunctionBoxCouple | undefined {
        return this.couplesByDistance[index]
    }

    sameCircuit(box1: JunctionBox, box2: JunctionBox) {
        const box1CircuitIndex = this.circuits.findIndex(c => c.indexOf(box1) != -1)
        const box2CircuitIndex = this.circuits.findIndex(c => c.indexOf(box2) != -1)
        return box1CircuitIndex == box2CircuitIndex
    }

    connect(box1: JunctionBox, box2: JunctionBox) {
        const box1CircuitIndex = this.circuits.findIndex(circuit => circuit.indexOf(box1) != -1)
        const box2CircuitIndex = this.circuits.findIndex(circuit => circuit.indexOf(box2) != -1)

        const box1Circuit = this.circuits[box1CircuitIndex]
        const box2Circuit = this.circuits[box2CircuitIndex]

        if (box1Circuit == box2Circuit) {
            throw new Error("Already connected")
        }

        box1Circuit.connectCircuit(box2Circuit)

        this.circuits.splice(box2CircuitIndex, 1)

        return;
    }

    largestMultiplication() {
        const sortedCircuits = this.circuits.toSorted((a, b) => b.size() - a.size())
        return sortedCircuits[0].size() * sortedCircuits[1].size() * sortedCircuits[2].size()
    }

    toString() {
        return this.circuits.map((c, idx) => `Circuit ${idx}: ${c.toString()}`).join("\n")
    }
}