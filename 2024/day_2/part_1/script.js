import fs from "fs"

const input = fs.readFileSync("input.txt", "utf-8")

const reports = input.split("\n")

let safeReportsCount = 0;

reportLoop:
for (let i = 0; i < reports.length; i++) {
    const report = reports[i]
    const levels = report.split(" ").map(Number)
    for (let j = 1; j < levels.length; j++) {
        const diff = levels[j] - levels[j - 1]
        const absDiff = Math.abs(diff)
        if (absDiff < 1 || absDiff > 3) {
            continue reportLoop;
        }
        if (j != 1) {
            const previousDiff = levels[j - 1] - levels[j - 2]
            if ((previousDiff < 0 && diff > 0) || (previousDiff > 0 && diff < 0)) {
                continue reportLoop
            }
        }
    }
    safeReportsCount++
}
console.log(safeReportsCount, "Report sicuri")