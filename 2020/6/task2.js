function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n\n');
}

function customCustoms(arr) {
    let sum = 0;

    for (const group of arr) {
        const answers = group.split('\n');
        const firstLetters = answers[0].split('');

        sum += firstLetters.filter((letter) => answers.every((a) => a.includes(letter))).length;
    }

    return sum;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = customCustoms(data);

    return result;
}

console.log(solve('input.txt')); // 3464
