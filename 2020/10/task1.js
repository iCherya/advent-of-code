function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n').map(Number);
}

function adapterArray(arr) {
    let numberOfDifferencesOf1Jolt = 0;
    let numberOfDifferencesOf3Jolt = 0;

    const sorted = [0, ...arr.sort((a, b) => a - b), arr[arr.length - 1] + 3];

    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1];
        const curr = sorted[i];

        curr - prev === 1 ? numberOfDifferencesOf1Jolt++ : numberOfDifferencesOf3Jolt++;
    }

    return numberOfDifferencesOf1Jolt * numberOfDifferencesOf3Jolt;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = adapterArray(data);

    return result;
}

console.log(solve('input.txt')); // 1876
