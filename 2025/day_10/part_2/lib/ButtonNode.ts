import { Button } from "./Button"

export class ButtonNode {
    button: Button
    next: ButtonNode[]

    constructor(button: Button) {
        this.button = button
        this.next = []
    }

    link(node: ButtonNode) {
        this.next.push(node)
    }

    toString() {
        return `${this.button.toString()}`
    }
}