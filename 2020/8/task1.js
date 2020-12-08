function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((el) => el.split(' '));
}

function handheldHalting(arr) {
    let accumulator = 0;
    const visited = new Array(arr.length).fill(false);

    for (let i = 0; i < arr.length; i++) {
        const operation = arr[i][0];
        const argument = parseInt(arr[i][1]);

        if (!visited[i]) {
            visited[i] = true;

            if (operation === 'nop') {
                continue;
            } else if (operation === 'acc') {
                accumulator += argument;
            } else {
                i += argument - 1;
            }
        } else {
            break;
        }
    }

    return accumulator;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = handheldHalting(data);

    return result;
}

console.log(solve('input.txt')); // 1475
