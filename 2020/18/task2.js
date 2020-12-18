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
        const times = expression.split('').filter((el) => el === '(').length + 1;

        for (let j = 0; j < times; j++) {
            newExpression = newExpression.replace(/\((\d+( [+*] \d+)+)\)/, (match, $1) => {
                let newExpr = $1;

                const newTimes = expression.split('').filter((el) => el === '+' || el === '*')
                    .length;

                for (let i = 0; i < newTimes; i++) {
                    newExpr = newExpr.replace(/(\d+) \+ (\d+)/, (match, $1, $2) =>
                        (+$1 + +$2).toString()
                    );
                }

                for (let i = 0; i < newTimes; i++) {
                    newExpr = newExpr.replace(/(\d+) \* (\d+)/, (match, $1, $2) =>
                        (+$1 * +$2).toString()
                    );
                }

                return newExpr;
            });
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

console.log(solve('input.txt')); // 276894767062189
