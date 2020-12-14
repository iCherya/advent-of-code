function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((el) => el.split(' = '));
}

function getBinary36BitsString(number) {
    return parseInt(number).toString(2).padStart(36, '0');
}

function getDecimalusingMask(mask, value) {
    let result = '';

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
            result += value[i];
        } else {
            result += mask[i];
        }
    }

    return parseInt(result, 2);
}

function getTaskResult(data) {
    const memory = {};
    let currentMask = '';

    for (let [instruction, value] of data) {
        if (instruction === 'mask') {
            currentMask = value;
            continue;
        }

        const memoryKey = instruction.slice(4, -1);
        const binary = getBinary36BitsString(+value);
        const decimalResult = getDecimalusingMask(currentMask, binary);

        memory[memoryKey] = decimalResult;
    }

    return Object.values(memory).reduce((acc, cur) => acc + cur);
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 10050490168421
