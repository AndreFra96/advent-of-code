import fs from "fs";

const input = fs.readFileSync('./input.txt', 'utf-8');
const banks = input.split('\n');
const SIZE = 12;

// let bankMaxSum = banks.map(bank => getMaxBankValue(bank, 12)).reduce((a, b) => a + b, 0);
console.time('Total time');
let maxBankSum = 0;
for (const bank of banks) {
    const best = bestBankCellsCombinationOptimized(bank, SIZE)
    maxBankSum += best;
}
console.log(`Sum of all banks' max values: ${maxBankSum}`);
console.timeEnd('Total time');

//Trova la combinazione migliore testandole tutte, potenzialmente
//funziona ma con dimensione 12 su bank di 100 celle ci metterebbe giorni
//In pratica quello che fa è creare dei loop, tanti loop quanto è valueSize, non sapendo
//qual'è la dimensione di valueSize i loop vengono gestiti tramite un array di indici dove ogni posizione
//contiene l'indice attuale di un loop
function bestBankCellsCombination(bank, valueSize) {
    const bankCells = bank.split('');
    const indexes = Array(valueSize).fill(0).map((_, i) => i);
    let currentBest = 0;
    while (indexes[0] <= bankCells.length - valueSize) {
        const current = parseInt(indexes.map(i => bankCells[i]).join(''))
        if (current > currentBest) {
            currentBest = current;
        }
        const indexesToReset = [];
        for (let i = indexes.length - 1; i >= 0; i--) {
            const maxValue = bankCells.length - (indexes.length - i)
            if (indexes[i] < maxValue) {
                indexes[i]++;
                break;
            } else {
                indexesToReset.push(i)
            }
        }
        if (indexesToReset.length > 0) {
            for (let i = indexesToReset.length - 1; i >= 0; i--) {
                indexes[indexesToReset[i]] = indexes[indexesToReset[i] - 1] + 1;
            }
        }
    }
    return currentBest;
}


//Posso ottimizzare questa funzione ragionando in modo diverso, prepariamo 12 celle da riempire
//e andiamo a riempirle una alla volta con il valore più grande che troviamo
//Il ragionamento alla base è che qualsiasi numero che inizia con 9 sarà più grande di qualsiasi altro numero che inizia
//per 8 e così via
function bestBankCellsCombinationOptimized(bank, valueSize) {
    const bestCellsIndexes = Array(valueSize).fill(null)
    const bankCells = bank.split("")

    for (let i = 0; i < valueSize; i++) {
        const cellsIndex = i == 0 ? -1 : bestCellsIndexes[i - 1]
        const nextCellIndex = cellsIndex + 1
        let maxValueIndex = nextCellIndex;
        for (let j = nextCellIndex; j <= bankCells.length - valueSize + i; j++) {
            if (parseInt(bankCells[j]) > parseInt(bankCells[maxValueIndex])) {
                maxValueIndex = j
            }
        }
        bestCellsIndexes[i] = maxValueIndex
    }

    const bestCellsValues = bestCellsIndexes.map((idx) => bankCells[idx])
    return parseInt(bestCellsValues.join(""));
}