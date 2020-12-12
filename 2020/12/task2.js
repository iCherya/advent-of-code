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

class Item {
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
    const ship = new Item();
    const waypoint = new Item();

    ship.add(new Direction('N', 'E', 'W', 0));
    ship.add(new Direction('E', 'S', 'N', 0));
    ship.add(new Direction('S', 'W', 'E', 0));
    ship.add(new Direction('W', 'N', 'S', 0));

    waypoint.add(new Direction('N', 'E', 'W', 1));
    waypoint.add(new Direction('E', 'S', 'N', 10));
    waypoint.add(new Direction('S', 'W', 'E', 0));
    waypoint.add(new Direction('W', 'N', 'S', 0));

    for (const item of data) {
        const [instruction, value] = item;

        if (['N', 'E', 'S', 'W'].find((el) => el === instruction)) {
            waypoint.findDirection(instruction).value += value;
        }

        if (instruction === 'F') {
            for (let i = 0; i < ship.directions.length; i++) {
                ship.directions[i].value += value * waypoint.directions[i].value;
            }
        }

        if (instruction === 'L') {
            let round = value / 90;
            while (round > 0) {
                const temp = waypoint.directions[0].value;
                for (let i = 1; i < waypoint.directions.length; i++) {
                    waypoint.directions[i - 1].value = waypoint.directions[i].value;
                }
                waypoint.directions[waypoint.directions.length - 1].value = temp;

                round--;
            }
        }
        if (instruction === 'R') {
            let round = value / 90;
            while (round > 0) {
                const temp = waypoint.directions[waypoint.directions.length - 1].value;
                for (let i = waypoint.directions.length - 1; i > 0; i--) {
                    waypoint.directions[i].value = waypoint.directions[i - 1].value;
                }
                waypoint.directions[0].value = temp;

                round--;
            }
        }
    }

    const northToSouth = Math.abs(ship.findDirection('N').value - ship.findDirection('S').value);
    const eastToWest = Math.abs(ship.findDirection('E').value - ship.findDirection('W').value);

    return northToSouth + eastToWest;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 42908
