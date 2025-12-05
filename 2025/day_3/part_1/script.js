import fs from "fs";

const input = fs.readFileSync('./input.txt', 'utf-8');
const banks = input.split('\n');

let bankMaxSum = 0;
for (const bank of banks) {
    const bankCells = bank.split('');
    let maxBankValue = 0;
    for (let i = 0; i < bankCells.length; i++) {
        for (let j = i + 1; j < bankCells.length; j++) {
            const value = parseInt(bankCells[i] + bankCells[j]);
            if (value > maxBankValue) {
                maxBankValue = value;
            }
        }
    }
    bankMaxSum += maxBankValue;
}
console.log(`Sum of all banks' max values: ${bankMaxSum}`);