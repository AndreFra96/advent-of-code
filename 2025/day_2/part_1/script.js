
import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8');
const ranges = input.split(',')
let invalidIDsSum = 0;
for (const range of ranges) {
    const [min, max] = range.split('-').map(x => parseInt(x))
    const invalidIDs = [];
    for (let id = min; id <= max; id++) {
        if (!isValidID(id)) {
            invalidIDs.push(id);
        }
    }
    if (invalidIDs.length > 0) {
        console.log(`${min}-${max} HAS ${invalidIDs.length} INVALID IDS: ${invalidIDs.join(', ')}`);
        invalidIDsSum += invalidIDs.reduce((a, b) => a + b, 0);
    }
}

console.log(`Sum of all invalid IDs: ${invalidIDsSum}`);

function isValidID(id) {
    if (isRepeatedDigits(id)) {
        return false;
    }
    return true;
}

function isRepeatedDigits(id) {
    const strId = id.toString();
    const firstHalf = strId.slice(0, Math.floor(strId.length / 2));
    const secondHalf = strId.slice(Math.floor(strId.length / 2));
    if (firstHalf === secondHalf) {
        return true;
    }
    return false;
}