function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((x, i) =>
            x
                .split('')
                .map((y, j) => (y === '#' ? `${i},${j},0,0` : null))
                .filter((el) => el !== null)
        )
        .flat();
}

function makeVectors(dim) {
    if (dim === 1) {
        return [[-1], [0], [1]];
    }

    return makeVectors(dim - 1)
        .map((v) => [-1, 0, 1].map((x) => [x, ...v]))
        .flat();
}

function getVectors(dim) {
    return makeVectors(dim).filter((v) => v.some((x) => x !== 0));
}

function adjacent(vectors) {
    return function (coord) {
        const [x, y, z, w] = coord.split(',').map(Number);

        return vectors.map(([s, t, u = 0, v = 0]) => [x + s, y + t, z + u, w + v].join(','));
    };
}

function activeAdjacent(vectors, active, coord) {
    return adjacent(vectors)(coord).reduce((acc, cur) => (active.has(cur) ? acc + 1 : acc), 0);
}

function next(vectors, active) {
    const isBetween = (min, max, val) => val >= min && val <= max;

    const inactive = new Set(
        [...active]
            .map(adjacent(vectors))
            .flat()
            .filter((x) => !active.has(x))
    );

    const stillActive = [...active].filter((coord) =>
        isBetween(2, 3, activeAdjacent(vectors, active, coord))
    );

    const newActive = [...inactive].filter((coord) =>
        isBetween(3, 3, activeAdjacent(vectors, active, coord))
    );

    return new Set([...stillActive, ...newActive]);
}

function getTaskResult(data, dimention) {
    const vectors = getVectors(dimention);

    let active = new Set(data);

    for (let i = 0; i < 6; i++) {
        active = next(vectors, active);
    }

    return active.size;
}

function solve(fileName, dimention) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = getTaskResult(data, dimention);

    return result;
}

console.log(solve('input.txt', 3)); // 230
console.log(solve('input.txt', 4)); // 1600
