import { Button } from "./Button";
import { ButtonNode } from "./ButtonNode";

export class ButtonsTree {
    buttons: Button[]
    root: ButtonNode[]

    constructor(buttons: Button[]) {
        this.buttons = buttons;
    }

    buildTreeLevel() {
        let leaves = this.getAllLeaves()
        for (let leaf of leaves) {
            leaf.next = this.buttons.map(button => new ButtonNode(button))
        }
    }

    getAllLeaves(): ButtonNode[] {
        let nodes: ButtonNode[] = []
        for (const node of this.root) {
            const leaves = this.getLeaves(node)
            for (const leaf of leaves) {
                nodes.push(leaf)
            }
        }
        return nodes
    }

    getLeaves(node: ButtonNode): ButtonNode[] {
        if (node.next.length == 0) {
            return [node];
        }
        return node.next.map(n => this.getLeaves(n)).flat()
    }

    setValues(values: Button[]) {
        this.buttons = values;
    }

    findPathToTarget(currentNode: ButtonNode, currentValue: boolean[], target: boolean[], usedButtons: Button[]): Button[] | null {

        //Controllo se con il bottone attuale arrivo al target
        const currentBool = currentValue
        const buttonBool = currentNode.button.toBooleanSequence(target.length)
        const merged = this.mergeSequence(currentBool, buttonBool)
        if (this.equals(merged, target)) {
            return [...usedButtons, currentNode.button]
        }

        //Se non sono arrivato al target proseguo la ricerca sui figli
        for (const node of currentNode.next) {
            const path = this.findPathToTarget(node, merged, target, [...usedButtons, currentNode.button])
            if (path) {
                return path
            }
        }

        return null
    }

    pathToTarget(target: boolean[]): Button[] | null {
        for (const node of this.root) {
            const initialValue = new Array(target.length).fill(false)
            const path = this.findPathToTarget(node, initialValue, target, [])
            if (path != null) {
                return path
            }
        }
        return null
    }

    equals(base: boolean[], compare: boolean[]) {
        for (let i = 0; i < base.length; i++) {
            if (base[i] != compare[i])
                return false
        }
        return true
    }

    mergeSequence(a: boolean[], b: boolean[]): boolean[] {
        if (a.length != b.length) {
            throw new Error("Merge different sequences")
        }
        return new Array(a.length).fill(false).map((_, idx) => {
            let first = a[idx] ?? false
            let second = b[idx] ?? false
            return this.xor(first, second)
        })
    }

    xor(a: boolean, b: boolean): boolean {
        if (a && b) return false
        if (!a && !b) return false
        return true
    }

    startTree() {
        this.root = this.buttons.map(val => new ButtonNode(val))
    }

}