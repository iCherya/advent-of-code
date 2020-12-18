function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n');
}

function getTaskResult(data) {
    let sum = 0;

    for (const expression of data) {
        let newExpression = '(' + expression + ')';

        const times = expression.split('').filter((el) => el === '+' || el === '*').length;

        for (let i = 0; i < times; i++) {
            newExpression = newExpression
                .replace(/\(\d+ [+*] \d+/, (match) => '(' + eval(match + ')').toString())
                .replace(/\((\d+)\)/, (match, $1) => $1);
        }

        sum += +newExpression;
    }

    return sum;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);
    return result;
}

console.log(solve('input.txt')); // 86311597203806
