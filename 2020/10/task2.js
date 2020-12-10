function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n').map(Number);
}

function adapterArray(arr) {
    const sorted = [0, ...arr.sort((a, b) => a - b), arr[arr.length - 1] + 3];

    const combinations = [];
    combinations.push(1);

    for (let i = 1; i < sorted.length; i++) {
        combinations.push(0);

        for (let j = 1; j <= 3; j++) {
            const index = i - j;

            if (index < 0 || sorted[i] - sorted[index] > 3) {
                break;
            }

            combinations[i] += combinations[index];
        }
    }

    return combinations[combinations.length - 1];
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = adapterArray(data);

    return result;
}

console.log(solve('input.txt')); // 14173478093824
