import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8');

const splitted = input.split("\n\n")
const ranges = splitted[0].split("\n")

//UNISCO I VARI RANGE IN MODO TALE DA CREARE DEI RANGE SENZA OVERLAP
const numberRanges = ranges.map(r => r.split("-").map(Number))

numberRanges.sort((a, b) => {
    return a[0] - b[0]
})

const uniqueRanges = [];

for (let i = 0; i < numberRanges.length; i++) {
    const currentRange = numberRanges[i]

    if (i == 0) {
        uniqueRanges.push(currentRange)
    }

    const [_, previousRangeEnd] = uniqueRanges[uniqueRanges.length - 1]
    const [currentRangeStart, currentRangeEnd] = currentRange

    const startsAfterPreviousRange = currentRangeStart > previousRangeEnd
    const endsBeforePreviousRange = currentRangeEnd < previousRangeEnd

    if (startsAfterPreviousRange) {
        uniqueRanges.push(currentRange)
        continue;
    }

    if (endsBeforePreviousRange) {
        continue;
    }

    uniqueRanges[uniqueRanges.length - 1][1] = currentRangeEnd
}

//CALCOLO LE DIFFERENZE FRA FINE E INIZIO
let totalDiff = 0;
for (const range of uniqueRanges) {
    const [rangeStart, rangeEnd] = range;
    const diff = rangeEnd - rangeStart + 1
    totalDiff += diff
}
console.log(totalDiff, "prodotti freschi")
