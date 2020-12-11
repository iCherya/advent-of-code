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

function calculateOccupiedSeats(grid) {
    let counter = 0;

    for (let item of grid) {
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

function checkOccupiedSeats(adj) {
    for (let item of adj) {
        if (item === '#') return false;
    }
    return true;
}

function round(grid) {
    let newRoundGrid = [new Array(grid[0].length + 2).fill(null)];

    for (let i = 1; i < grid.length - 1; i++) {
        const newRoundRow = [null];
        for (let j = 1; j < grid[i].length - 1; j++) {
            let seat = grid[i][j];

            const top = grid[i - 1][j];
            const topRigth = grid[i - 1][j + 1];
            const rigth = grid[i][j + 1];
            const rigthBottom = grid[i + 1][j + 1];
            const botttom = grid[i + 1][j];
            const botttomLeft = grid[i + 1][j - 1];
            const left = grid[i][j - 1];
            const leftTop = grid[i - 1][j - 1];

            const adj = [top, topRigth, rigth, rigthBottom, botttom, botttomLeft, left, leftTop];

            if (seat === 'L') {
                const isAdjEmpty = checkOccupiedSeats(adj);

                if (isAdjEmpty) {
                    seat = '#';
                }
            } else if (seat === '#') {
                const isAdjEmptyAgaint = calculateOccupiedSeats(adj);

                if (isAdjEmptyAgaint >= 4) {
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

function getTaskResult(data) {
    let grid = [];
    grid.push(new Array(data[0].length + 2).fill(null));
    for (let row of data) {
        const newRow = [null];
        for (let item of row) {
            const newItem = item === 'L' ? '#' : '.';
            newRow.push(newItem);
        }
        newRow.push(null);
        grid.push(newRow);
    }
    grid.push(new Array(data[0].length + 2).fill(null));

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

console.log(solve('input.txt')); // 2263
