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

function customCustoms(arr) {
    const yes = [];

    for (item of arr) {
        const set = new Set();
        for (let el of item) {
            for (let i = 0; i < el.length; i++) {
                set.add(el[i]);
            }
        }
        yes.push(set.size);
    }

    return yes.reduce((prev, curr) => prev + curr);
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = customCustoms(data);

    return result;
}

console.log(solve('input.txt')); // 6878
