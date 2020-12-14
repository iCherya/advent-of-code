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
    let binary = '';

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '1') {
            binary += '1';
        } else if (mask[i] === '0') {
            binary += value[i];
        } else {
            binary += 'X';
        }
    }

    const queue = [binary];
    const result = [];

    main: while (queue.length > 0) {
        const currrentBinary = queue.shift();

        if (!currrentBinary.split('').includes('X')) {
            result.push(currrentBinary);
        }

        for (let i = 0; i < currrentBinary.length; i++) {
            if (currrentBinary[i] === 'X') {
                const prefix = currrentBinary.slice(0, i);
                let suffix;

                if (i === currrentBinary.length + 1) {
                    suffix = '';
                } else {
                    suffix = currrentBinary.slice(i + 1);
                }

                const option1 = prefix + '1' + suffix;
                const option2 = prefix + '0' + suffix;

                queue.push(option1, option2);
                break;
            }
        }
    }

    return result;
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
        const binary = getBinary36BitsString(+memoryKey);
        const decimalResult = getDecimalusingMask(currentMask, binary);

        for (let decimal of decimalResult) {
            const newKey = parseInt(decimal, 2);
            memory[newKey] = +value;
        }
    }

    return Object.values(memory).reduce((acc, cur) => acc + cur);
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 2173858456958
