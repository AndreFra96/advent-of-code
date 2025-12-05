
import fs from 'fs';

console.time('script');
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
console.timeEnd('script');

console.log(`Sum of all invalid IDs: ${invalidIDsSum}`);

function isValidID(id) {
    if (isRepeatedDigits(id)) {
        return false;
    }
    if (isSequence(id)) {
        return false;
    }
    return true;
}

function isRepeatedDigits(id) {
    const strId = id.toString();
    if (strId.length < 2) return false;
    const firstHalf = strId.slice(0, Math.floor(strId.length / 2));
    const secondHalf = strId.slice(Math.floor(strId.length / 2));
    if (firstHalf === secondHalf) {
        return true;
    }
    return false;
}

function isSequence(id) {
    const strId = id.toString();
    if (strId.length < 2) return false;
    for (let i = 1; i < strId.length / 2 + 1; i++) {
        let hasDifference = false;
        //prendo i caratteri da 0 a i
        const char = strId.substring(0, i);
        //scorro il resto della stringa in gruppi della lunghezza di char
        for (let j = i; j < strId.length; j += char.length) {
            const nextChar = strId.substring(j, j + char.length);
            if (nextChar !== char) {
                hasDifference = true;
                break;
            }
        }
        if (!hasDifference) {
            return true;
        }
    }
    return false;
}


//Implementazione alternativa con regex (molto più lenta)
function isRepeatedDigitsRegex(id) {
    const strId = id.toString();
    const regex = /^(\d+)\1+$/;
    return regex.test(strId);
}

//Implementazione alternativa con regex (stessa velocità della precedente)
function isSequenceRegex(id) {
    const strId = id.toString();
    const regex = /^(\d+)(\1)+$/;
    return regex.test(strId);
}