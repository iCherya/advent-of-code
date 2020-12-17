function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n\n')
        .map((el) => el.split('\n'));
}

function getTaskResult(data) {
    const [r, t, n] = data;

    const nearbyTickets = n.splice(1).map((el) => el.split(',').map(Number));

    const rules = new Set();
    for (const item of r) {
        const value = item.split(': ')[1];
        const ranges = value.split(' or ').map((el) => el.split('-').map(Number));

        for (const range of ranges) {
            for (let i = range[0]; i <= range[1]; i++) {
                rules.add(i);
            }
        }
    }

    const result = [];
    for (const ticket of nearbyTickets) {
        for (const x of ticket) {
            if (!rules.has(x)) {
                result.push(x);
                break;
            }
        }
    }

    return result.reduce((acc, curr) => acc + curr);
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 26988
