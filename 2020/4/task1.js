function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n\n')
        .map((el) => el.split('\n'))
        .map((el) => el.join(' '))
        .map((el) => el.split(' '));
}

function matchPassport(arr) {
    let counter = arr.length;

    for (const item of arr) {
        const passport = {};

        for (const data of item) {
            const [key, value] = data.split(':');
            passport[key] = value;
        }

        if (item.length < 7) {
            counter--;
            continue;
        }

        if (item.length === 7 && passport.cid) {
            counter--;
            continue;
        }
    }

    return counter;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = matchPassport(data);

    return result;
}

console.log(solve('input.txt')); // 625
