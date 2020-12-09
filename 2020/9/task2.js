function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n').map(Number);
}

function subArraySum(arr, sum) {
    for (let i = 0; i < arr.length; i++) {
        let currentSum = arr[i];
        let j = i + 1;

        while (j <= arr.length) {
            if (currentSum === sum) {
                return [i, j - 1];
            }

            if (currentSum > sum || j === arr.length) {
                break;
            }

            currentSum += arr[j];
            j++;
        }
    }

    return false;
}

function encodingError(data, invalidNumber) {
    const rangeIndexes = subArraySum(data, invalidNumber);

    if (rangeIndexes) {
        const [rangeFrom, rangeTo] = rangeIndexes;

        const rangeArray = data.slice(rangeFrom, rangeTo);
        const sorted = rangeArray.sort((a, b) => a - b);

        return sorted[0] + sorted[sorted.length - 1];
    }

    return false;
}

function solve(fileName, invalidNumber) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = encodingError(data, invalidNumber);

    return result;
}

console.log(solve('input.txt', 22406676)); // 2942387
