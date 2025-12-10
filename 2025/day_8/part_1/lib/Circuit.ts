import { JunctionBox } from "./JunctionBox"

export class Circuit {

    private boxes: Array<JunctionBox>

    constructor(boxes?: Array<JunctionBox>) {
        this.boxes = boxes || []
    }

    connect(box: JunctionBox) {
        this.boxes.push(box)
    }

    connectCircuit(circuit: Circuit) {
        this.boxes.push(...circuit.boxes)
    }

    indexOf(box: JunctionBox) {
        return this.boxes.findIndex(search => search == box)
    }

    size() {
        return this.boxes.length
    }

    toString() {
        return [...this.boxes].map(b => `(${b.x},${b.y},${b.z})`).join(" ")
    }

}