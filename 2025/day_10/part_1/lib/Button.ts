export class Button {
    values: number[]

    constructor(values: number[]) {
        this.values = values
    }

    getFilled(len: number) {
        return new Array(len).fill(0).map((_, idx) => this.values.includes(idx) ? '#' : '.')
    }

    toBooleanSequence(len: number) {
        return new Array(len).fill(0).map((_, idx) => this.values.includes(idx) ? true : false)
    }

    toString() {
        return `Button: [${this.values.join(",")}]`
    }
}