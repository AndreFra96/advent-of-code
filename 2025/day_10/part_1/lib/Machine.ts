import { Button } from "./Button";
import { ButtonsTree } from "./ButtonsTree";

export class Machine {
    targetLigths: boolean[]
    buttons: Button[]
    joltage: number[]
    tree: ButtonsTree

    constructor(targetLights: boolean[], buttons: number[][], joltage: number[]) {
        this.targetLigths = targetLights;
        this.buttons = buttons.map(bt => new Button(bt))
        this.joltage = joltage
        this.tree = new ButtonsTree([])
    }

    buttonsSequencesToTarget(maxDepth: number): Button[] {
        //Costruisco l'albero
        // const involvedButtons = this.involvedButtons()
        this.tree.setValues(this.buttons)
        this.tree.startTree()
        for (let i = 0; i < maxDepth; i++) {
            const path = this.tree.pathToTarget(this.targetLigths)
            if (path != null) {
                return path
            }
            this.tree.buildTreeLevel()
        }
        return []
    }


    toString() {
        return `Machine(\n targetLights = ${this.targetLigths.map(l => l ? '#' : '.').join('')}\n buttons =\n  ${this.buttons.map(b => b.toString()).join("\n  ")}\n joltage = ${this.joltage}\n)`
    }

}
