function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((el) => el.split(''));
}

function getTaskResult(data) {
    console.log('🚀 ~ file: task1.js ~ line 14 ~ taskFunction ~ arr', data);
    //
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('test.txt'));
// console.log(solve('input.txt'));
