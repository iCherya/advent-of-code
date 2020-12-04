function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((line) => line.split(' '));
}

function matchPasswordRule(arr) {
    let counter = 0;

    for (const elem of arr) {
        const [min, max] = elem[0].split('-').map(Number);
        const letter = elem[1][0];
        const string = elem[2];
        let matches = 0;

        for (let i = 0; i < string.length; i++) {
            if (letter === string[i]) {
                matches++;
            }
        }

        if (matches >= min && matches <= max) {
            counter++;
        }
    }

    return counter;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = matchPasswordRule(data);

    return result;
}

console.log(solve('input.txt')); // 625
