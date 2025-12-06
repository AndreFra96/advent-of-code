import fs from "fs"

const input = fs.readFileSync('./input.txt', 'utf-8')

const reports = input.split("\n")

let safeReportsCount = 0;
for (const report of reports) {
    const levels = report.split(" ").map(Number)
    //Controllo se inizialmente è sicuro
    const unsafeLevelIndex = firstReportUnsafeLevel(levels)
    if (unsafeLevelIndex == null) {
        safeReportsCount++
        continue;
    }
    //Provo togliendo il livello all'indice problematico
    if (firstReportUnsafeLevel(levels.filter((_, idx) => idx != unsafeLevelIndex)) == null) {
        safeReportsCount++
        continue;
    }
    //Provo togliendo il livello precedente all'indice problematico
    if (firstReportUnsafeLevel(levels.filter((_, idx) => idx != unsafeLevelIndex - 1)) == null) {
        safeReportsCount++
        continue;
    }
    //Provo togliendo il primo livello
    const [first, ...rest] = levels
    if (firstReportUnsafeLevel(rest) == null) {
        safeReportsCount++
        continue
    }
}
console.log(safeReportsCount, "report sicuri")


function firstReportUnsafeLevel(levels) {
    for (let j = 1; j < levels.length; j++) {
        const diff = levels[j] - levels[j - 1]
        const absDiff = Math.abs(diff)
        if (absDiff < 1 || absDiff > 3) {
            return j;
        }
        if (j != 1) {
            const previousDiff = levels[j - 1] - levels[j - 2]
            if ((previousDiff < 0 && diff > 0) || (previousDiff > 0 && diff < 0)) {
                return j;
            }
        }
    }
    return null;
}