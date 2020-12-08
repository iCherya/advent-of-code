function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n')
        .map((el) => el.split(' '));
}

function handheldHalting(arr) {
    let accumulator = 0;
    const process = (arr) => {
        accumulator = 0;
        const visited = new Array(arr.length).fill(false);

        for (let i = 0; i < arr.length; i++) {
            const operation = arr[i][0];
            const argument = parseInt(arr[i][1]);

            if (visited[i]) {
                return false;
            } else {
                visited[i] = true;

                if (operation === 'nop') {
                    continue;
                } else if (operation === 'acc') {
                    accumulator += argument;
                } else {
                    i = i + argument - 1;
                }
            }
        }

        return true;
    };

    const cloneArr = (arr) => {
        const cloned = [];

        for (let item of arr) {
            const newItem = [...item];
            cloned.push(newItem);
        }

        return cloned;
    };

    const nopIdxs = [],
        jmpArrIdxs = [];

    for (let i = 0; i < arr.length; i++) {
        const operation = arr[i][0];
        if (operation === 'nop') {
            nopIdxs.push(i);
        }

        if (operation === 'jmp') {
            jmpArrIdxs.push(i);
        }
    }

    for (let idx of nopIdxs) {
        const clone = cloneArr(arr);
        clone[idx][0] = 'jpm';

        const res = process(clone);

        if (res === true) {
            return accumulator;
        }
    }

    for (let idx of jmpArrIdxs) {
        const clone = cloneArr(arr);
        clone[idx][0] = 'nop';

        const res = process(clone);

        if (res === true) {
            return accumulator;
        }
    }
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = handheldHalting(data);

    return result;
}

console.log(solve('input.txt')); // 1270
