function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n')[1].split(',');
}

function modInverse(a, b) {
    a %= b;
    for (let x = BigInt(1); x < b; x++) {
        if ((a * x) % b == 1) {
            return x;
        }
    }
}

function getTaskResult(data) {
    const busIDs = data
        .map((value, index) => [value, index])
        .filter((item) => item[0] !== 'x')
        .map((item) => [BigInt(item[0]), BigInt(item[1])]);

    const max = busIDs.map((item) => item[0]).reduce((acc, cur) => acc * cur);

    return Number(
        busIDs.reduce(
            (acc, cur) =>
                acc + (((cur[0] - cur[1]) * max) / cur[0]) * modInverse(max / cur[0], cur[0]),
            BigInt(0)
        ) % max
    );
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 600691418730595
