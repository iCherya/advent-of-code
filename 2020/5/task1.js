function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n');
}

function binaryBoarding(arr) {
    let max = -Infinity;

    for (const seat of arr) {
        const id = getSeatID(seat);
        if (id > max) {
            max = id;
        }
    }

    return max;
}

function bs(arr, from, to) {
    for (let char of arr) {
        if (char === 'F' || char === 'L') {
            to -= Math.round((to - from) / 2);
        } else {
            from += Math.round((to - from) / 2);
        }
    }

    return to;
}

function getSeatParameters(string) {
    const rows = 128 - 1; // Start from 0
    const seats = 8 - 1; // Start from 0

    const rowsChars = string.slice(0, 7).split('');
    const seatsChars = string.slice(7).split('');

    const row = bs(rowsChars, 0, rows);
    const seat = bs(seatsChars, 0, seats);

    return [row, seat];
}

function getSeatID(seat) {
    const [rowNumber, seatNumber] = getSeatParameters(seat);
    const multipliatior = 8;

    const result = rowNumber * multipliatior + seatNumber;

    return result;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = binaryBoarding(data);

    return result;
}

console.log(solve('input.txt')); // 959
