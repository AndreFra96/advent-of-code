import fs from 'fs'
import { Dial } from './dial.js'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')
const dial = new Dial()
let countZero = 0;

for (const line of lines) {
    const [direction, ...steps] = line.split('')
    const stepCount = parseInt(steps.join(''))
    let lineZeroCount = 0;
    if (direction === 'L') {
        lineZeroCount += dial.turnLeft(stepCount)
    } else if (direction === 'R') {
        lineZeroCount += dial.turnRight(stepCount)
    }
    const current = dial.getCurrent()
    console.log(`THE DIAL IS ROTATED ${direction}${stepCount} TO POINT AT ${current}; during this rotation, it points at 0 ${lineZeroCount} times.`)
    countZero += lineZeroCount;
}

console.log(countZero)
