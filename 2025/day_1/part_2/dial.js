import { assert } from "console"

class Dial {
    MAX = 99
    CURRENT = 0

    constructor(start = 50) {
        this.CURRENT = start
    }

    turnLeftByOne() {
        this.CURRENT = ((this.CURRENT - 1) % (this.MAX + 1) + (this.MAX + 1)) % (this.MAX + 1)
    }

    turnRightByOne() {
        this.CURRENT = (this.CURRENT + 1) % (this.MAX + 1)
    }

    turnLeft(stepCount) {
        let zerosCount = 0;
        for (let i = 0; i < stepCount; i++) {
            this.turnLeftByOne()
            if (this.CURRENT === 0) {
                zerosCount++
            }
        }
        assert(this.CURRENT >= 0 && this.CURRENT <= this.MAX, `stepCount must be between 0 and ${this.MAX}`)
        return zerosCount;
    }

    turnRight(stepCount) {
        let zerosCount = 0;
        for (let i = 0; i < stepCount; i++) {
            this.turnRightByOne()
            if (this.CURRENT === 0) {
                zerosCount++
            }
        }
        assert(this.CURRENT >= 0 && this.CURRENT <= this.MAX, `stepCount must be between 0 and ${this.MAX}`)
        return zerosCount;
    }

    getCurrent() {

        return this.CURRENT
    }

}
export { Dial }