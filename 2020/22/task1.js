function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n\n')
        .map((el) =>
            el
                .split('\n')
                .map(Number)
                .filter((number) => !isNaN(number))
        );
}

function getTaskResult(data) {
    const [player1Cards, player2Cards] = data;

    while (player1Cards.length > 0 && player2Cards.length > 0) {
        const player1Move = player1Cards.shift();
        const player2Move = player2Cards.shift();

        if (player1Move > player2Move) {
            player1Cards.push(player1Move, player2Move);
        } else {
            player2Cards.push(player2Move, player1Move);
        }
    }

    const winnerStack = player1Cards.length > 0 ? player1Cards : player2Cards;

    return winnerStack.reverse().reduce((prev, curr, idx) => prev + curr * (idx + 1), 0);
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 35562
