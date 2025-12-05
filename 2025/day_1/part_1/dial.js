import { assert } from "console"

class Dial {
    MAX = 99
    CURRENT = 0

    constructor(start = 50) {
        this.CURRENT = start
    }

    turnLeft(stepCount) {
        this.CURRENT = ((this.CURRENT - stepCount) % (this.MAX + 1) + (this.MAX + 1)) % (this.MAX + 1)
        assert(this.CURRENT >= 0 && this.CURRENT <= this.MAX, `stepCount must be between 0 and ${this.MAX}`)
    }

    turnRight(stepCount) {
        this.CURRENT = (this.CURRENT + stepCount) % (this.MAX + 1)
        assert(this.CURRENT >= 0 && this.CURRENT <= this.MAX, `stepCount must be between 0 and ${this.MAX}`)
    }

    getCurrent() {

        return this.CURRENT
    }

}
export { Dial }