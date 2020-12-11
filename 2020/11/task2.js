function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((el) => el.split(''));
}

function calculateOccupiedSeats(arr) {
    let counter = 0;

    for (let item of arr) {
        if (Array.isArray(item)) {
            for (let seat of item) {
                if (seat === '#') {
                    counter++;
                }
            }
        } else {
            if (item === '#') {
                counter++;
            }
        }
    }

    return counter;
}

function isThereEmptySeat(adj) {
    for (let item of adj) {
        if (item === '#') return false;
    }
    return true;
}

function traverseDirection(start, direction, grid) {
    let [s1, s2] = start;
    const [e1, e2] = direction;

    while (grid[s1][s2]) {
        s1 += e1;
        s2 += e2;
        const next = grid[s1][s2];
        if (next !== '.') {
            return grid[s1][s2];
        }
    }

    return null;
}

function getVisibleSeats(seat, grid) {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }

            const item = traverseDirection(seat, [i, j], grid);
            visible.push(item);
        }
    }

    return visible;
}

function round(grid) {
    const newRoundGrid = [new Array(grid[0].length + 2).fill(null)];

    for (let i = 1; i < grid.length - 1; i++) {
        const newRoundRow = [null];
        for (let j = 1; j < grid[i].length - 1; j++) {
            let seat = grid[i][j];
            const visibleSeats = getVisibleSeats([i, j], grid);

            if (seat === 'L') {
                const empty = isThereEmptySeat(visibleSeats);

                if (empty) {
                    seat = '#';
                }
            } else if (seat === '#') {
                const occupied = calculateOccupiedSeats(visibleSeats);

                if (occupied >= 5) {
                    seat = 'L';
                }
            }
            newRoundRow.push(seat);
        }
        newRoundRow.push(null);
        newRoundGrid.push(newRoundRow);
    }
    newRoundGrid.push(new Array(grid[0].length + 2).fill(null));

    return newRoundGrid;
}

function getGridWithBorders(arr) {
    let grid = [];
    grid.push(new Array(arr[0].length + 2).fill(null));
    for (let row of arr) {
        const newRow = [null];
        for (let item of row) {
            const newItem = item === 'L' ? '#' : '.';
            newRow.push(newItem);
        }
        newRow.push(null);
        grid.push(newRow);
    }
    grid.push(new Array(arr[0].length + 2).fill(null));

    return grid;
}

function getTaskResult(data) {
    let grid = getGridWithBorders(data);

    let occupiedSeatsBefore = calculateOccupiedSeats(data);
    let occupiedSeatsAfter = calculateOccupiedSeats(grid);

    while (occupiedSeatsBefore !== occupiedSeatsAfter) {
        occupiedSeatsBefore = occupiedSeatsAfter;
        let newRoundGrid = round(grid);
        occupiedSeatsAfter = calculateOccupiedSeats(newRoundGrid);
        grid = newRoundGrid;
    }

    return occupiedSeatsAfter;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data);

    return result;
}

console.log(solve('input.txt')); // 2002
