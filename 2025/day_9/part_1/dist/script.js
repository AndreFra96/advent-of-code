import fs from "fs";
const input = fs.readFileSync('./input.txt', 'utf-8');
const coordinates = input.split("\n").map((row) => row.split(",").map(Number));
let largest = 0;
for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
        const first = coordinates[i];
        const second = coordinates[j];
        const sideOne = (first[0] > second[0] ? first[0] - second[0] : second[0] - first[0]) + 1;
        const sideTwo = (first[1] > second[1] ? first[1] - second[1] : second[1] - first[1]) + 1;
        const size = sideOne * sideTwo;
        if (size > largest) {
            largest = size;
        }
    }
}
console.log("Dimensione massima", largest);
//# sourceMappingURL=script.js.map