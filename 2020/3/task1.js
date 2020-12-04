function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    const inputArr = input.trim().split('\n');
    const data = [];
    for (const line of inputArr) {
        data.push(line.split(''));
    }

    return data;
}

function findTrees(arr) {
    let counter = 0;
    const [moveRight, moveDown] = [3, 1];

    const tree = '#';
    const patternWidth = arr[0].length;

    let j = 0;
    for (let i = 0; i < arr.length; i += moveDown) {
        if (arr[i][j] === tree) {
            counter++;
        }
        j = (j + moveRight) % patternWidth;
    }

    return counter;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = findTrees(data);

    return result;
}

console.log(solve('input.txt')); // 286
