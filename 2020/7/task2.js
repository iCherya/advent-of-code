function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input.trim().split('\n');
}

function handyHaversacks(arr) {
    const bags = arr.reduce((bags, line) => {
        const [, bag, otherBags] = /(\w+ \w+) bags contain (.*)\./.exec(line);

        if (otherBags === 'no other bags') {
            bags[bag] = [];
            return bags;
        }

        const childBags = otherBags.split(', ').map((otherBag) => {
            const [, quantity, type] = /(\d) (\w+ \w+) bag(s|\b)/.exec(otherBag);
            return { quantity: parseInt(quantity, 10), type };
        });

        bags[bag] = childBags;
        return bags;
    }, {});

    const traverse = (bag) => {
        let total = 0;

        Object.values(bags[bag]).forEach(({ quantity, type }) => {
            total += quantity + quantity * traverse(type);
        });

        return total;
    };

    return traverse('shiny gold');
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = handyHaversacks(data);

    return result;
}

console.log(solve('input.txt')); // 57281
