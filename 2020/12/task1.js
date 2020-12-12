function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((el) => [el.slice(0, 1), +el.slice(1)]);
}

class Direction {
    constructor(name, next, prev, value) {
        this.name = name;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class Compass {
    constructor() {
        this.directions = [];
    }
    add(node) {
        this.directions.push(node);
    }
    findDirection(char) {
        return this.directions.find((el) => el.name === char);
    }
}

function getTaskResult(data) {
    const compass = new Compass();
    compass.add(new Direction('N', 'E', 'W', 0));
    compass.add(new Direction('E', 'S', 'N', 0));
    compass.add(new Direction('S', 'W', 'E', 0));
    compass.add(new Direction('W', 'N', 'S', 0));

    let current = 'E';

    for (const item of data) {
        const [instruction, value] = item;

        if (['N', 'E', 'S', 'W'].find((el) => el === instruction)) {
            compass.findDirection(instruction).value += value;
        }

        if (instruction === 'F') {
            compass.findDirection(current).value += value;
        }

        if (instruction === 'L') {
            let round = value / 90;
            while (round > 0) {
                current = compass.findDirection(current).prev;
                round--;
            }
        }
        if (instruction === 'R') {
            let round = value / 90;
            while (round > 0) {
                current = compass.findDirection(current).next;
                round--;
            }
        }
    }

    const northToSouth = Math.abs(
        compass.findDirection('N').value - compass.findDirection('S').value
    );
    const eastToWest = Math.abs(
        compass.findDirection('E').value - compass.findDirection('W').value
    );

    return northToSouth + eastToWest;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 2228
