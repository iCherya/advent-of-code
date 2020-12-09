function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n').map(Number);
}

const twoSum = (nums, target) => {
    const arr = nums.map((el, idx) => [el, idx]).sort((a, b) => a[0] - b[0]);

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let sum = arr[left][0] + arr[right][0];

        if (sum === target) {
            return [arr[left][1], arr[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return false;
};

function encodingError(data, preambleCount) {
    for (let i = 0; i < data.length - preambleCount - 1; i++) {
        let preambleIndexFrom = i;
        let preambleIndexTo = preambleIndexFrom + preambleCount;

        const arr = data.slice(preambleIndexFrom, preambleIndexTo);
        const target = data[preambleIndexTo];

        const isValid = twoSum(arr, target);

        if (!isValid) {
            return target;
        }
    }
}

function solve(fileName, n) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = encodingError(data, n);

    return result;
}

console.log(solve('input.txt', 25)); // 22406676
