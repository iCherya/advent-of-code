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

    const result = recursiveGame(player1Cards, player2Cards);

    return result.cards.reverse().reduce((prev, curr, idx) => prev + curr * (idx + 1), 0);
}

function recursiveGame(player1Cards, player2Cards) {
    const playedCombinations = new Set();
    let game = 0;

    while (player1Cards.length > 0 && player2Cards.length > 0) {
        game++;

        const combination = player1Cards.join(',') + '-$-' + player2Cards.join(',');
        if (playedCombinations.has(combination)) {
            return {
                winner: 'player1',
                cards: player1Cards
            };
        }

        playedCombinations.add(combination);

        const player1Move = player1Cards.shift();
        const player2Move = player2Cards.shift();

        let winner;
        if (player1Cards.length >= player1Move && player2Cards.length >= player2Move) {
            const { winner: player } = recursiveGame(
                player1Cards.slice(0, player1Move),
                player2Cards.slice(0, player2Move)
            );
            winner = player;
        } else {
            winner = player1Move > player2Move ? 'player1' : 'player2';
        }

        if (winner === 'player1') {
            player1Cards.push(player1Move, player2Move);
        } else {
            player2Cards.push(player2Move, player1Move);
        }
    }

    return {
        winner: player1Cards.length > 0 ? 'player1' : 'player2',
        cards: player1Cards.length > 0 ? player1Cards : player2Cards
    };
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 34424
