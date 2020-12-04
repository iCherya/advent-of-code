function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n').map(Number);
}

function findThreeNumbersWhichSumEqual(sum, arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                const num1 = arr[i];
                const num2 = arr[j];
                const num3 = arr[k];

                if (num1 + num2 + num3 === sum) {
                    return [num1, num2, num3];
                }
            }
        }
    }
}

function solve(number, fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const numbers = findThreeNumbersWhichSumEqual(number, data);
    const result = numbers.reduce((prev, curr) => prev * curr);

    return result;
}

console.log(solve(2020, 'input.txt')); // 32858450
