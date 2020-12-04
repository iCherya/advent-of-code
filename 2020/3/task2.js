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

function findTrees(arr, moves) {
    let counter = 0;
    const [moveRight, moveDown] = moves;

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
    const result = [];

    const moves = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    for (const move of moves) {
        const answer = findTrees(data, move);
        result.push(answer);
    }

    return result.reduce((prev, curr) => prev * curr);
}

console.log(solve('input.txt')); // 3638606400
