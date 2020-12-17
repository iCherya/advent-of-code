function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n\n')
        .map((el) => el.split('\n'));
}

function getTaskResult(data) {
    const [r, t, n] = data;

    const myTicket = t[1].split(',').map(Number);

    let rules = r.map((item, i) => {
        const [key, value] = item.split(': ');
        const ranges = value.split(' or ').map((el) => el.split('-').map(Number));

        const ruleNumbers = [];

        for (const range of ranges) {
            for (let i = range[0]; i <= range[1]; i++) {
                ruleNumbers.push(i);
            }
        }

        return {
            name: key,
            initialPosition: i,
            numbers: ruleNumbers
        };
    });

    const allNumbersArray = Array.from(new Set(rules.map((el) => el.numbers).flat()));

    const nearbyTickets = n
        .splice(1)
        .map((el) => el.split(',').map(Number))
        .filter((array) => array.every((v) => allNumbersArray.includes(v)));

    const nearbyTicketsByIdx = getTicketsByTheirIdx(nearbyTickets).map((el, i) => [i, el]);

    let result = [];
    while (nearbyTicketsByIdx.length) {
        const [i, nums] = nearbyTicketsByIdx.shift();

        const matches = rules.filter((item) => nums.every((n) => item.numbers.includes(n)));

        if (matches.length === 1) {
            (rules = rules.filter((n) => n.name !== matches[0].name)) &&
                /departure/.test(matches[0].name) &&
                result.push(myTicket[i]);
        } else {
            nearbyTicketsByIdx.push([i, nums]);
        }
    }

    return result.reduce((acc, cur) => acc * cur, 1);
}

function getTicketsByTheirIdx(ticketsArr) {
    const ticketsByRulesIdx = ticketsArr[0].map((_) => []);

    for (let i = 0; i < ticketsArr[0].length; i++) {
        for (let j = 0; j < ticketsArr.length; j++) {
            ticketsByRulesIdx[i].push(ticketsArr[j][i]);
        }
    }

    return ticketsByRulesIdx;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 426362917709
