function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n');
}

function getTaskResult(data) {
    const timestamp = parseInt(data[0]);
    const busIds = data[1]
        .split(',')
        .filter((el) => !isNaN(+el))
        .map(Number);

    let nearest = timestamp;
    let choosenBusId;

    let notFindNearestBusId = true;
    while (notFindNearestBusId) {
        for (const bus of busIds) {
            if (nearest % bus === 0) {
                choosenBusId = bus;
                notFindNearestBusId = false;
            }
        }

        nearest++;
    }

    return (--nearest - timestamp) * choosenBusId;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 410
