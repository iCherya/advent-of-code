function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('.\n')
        .map((el) => el.split(' contain '));
}

function handyHaversacks(arr) {
    const bags = {};
    for (const rule of arr) {
        const [parentBag, childBags] = rule;

        const children = childBags.split(', ').map((el) => {
            let number = +el[0];
            if (isNaN(number)) number = 0;

            let type = el.slice(2);
            if (number === 1) {
                type += 's';
            }

            const bag = {};
            bag[type] = number;

            return bag;
        });

        bags[parentBag] = children;
    }

    const bagsVisited = {};
    for (let item in bags) {
        bagsVisited[item] = false;
    }

    const stack = [];
    let counter = 0;

    const search = (searchingBag) => {
        for (const key in bags) {
            const children = bags[key];
            if (!bagsVisited[key]) {
                for (const bag of children) {
                    if (bag[searchingBag]) {
                        counter++;
                        stack.push(key);
                        bagsVisited[key] = true;
                    }
                }
            }
        }
    };

    search('shiny gold bags');

    while (stack.length > 0) {
        let searchingBag = stack.pop();
        search(searchingBag, bags);
    }

    return counter;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = handyHaversacks(data);

    return result;
}

console.log(solve('input.txt')); // 248
