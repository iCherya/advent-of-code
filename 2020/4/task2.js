function readFile(taskFile) {
    const fs = require('fs');
    return fs.readFileSync(taskFile, 'utf8');
}

function getPreparedData(input) {
    return input
        .trim()
        .split('\n\n')
        .map((el) => el.split('\n'))
        .map((el) => el.join(' '))
        .map((el) => el.split(' '));
}

function matchPassport(arr) {
    let counter = arr.length;

    for (const item of arr) {
        const passport = {};

        for (const data of item) {
            const [key, value] = data.split(':');
            passport[key] = value;
        }

        if (item.length < 7) {
            counter--;
            continue;
        }

        if (item.length === 7 && passport.cid) {
            counter--;
            continue;
        }

        if (+passport.byr < 1920 || +passport.byr > 2002) {
            counter--;
            continue;
        }

        if (+passport.iyr < 2010 || +passport.iyr > 2020) {
            counter--;
            continue;
        }

        if (+passport.eyr < 2020 || +passport.eyr > 2030) {
            counter--;
            continue;
        }

        const heightType = passport.hgt.slice(-2);
        const heightValue = +passport.hgt.slice(0, -2);

        if (heightType === 'cm') {
            if (heightValue < 150 || heightValue > 193) {
                counter--;
                continue;
            }
        } else {
            if (heightValue < 59 || heightValue > 76) {
                counter--;
                continue;
            }
        }

        const hash = passport.hcl[0];
        if (hash !== '#') {
            counter--;
            continue;
        }

        const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

        if (!colors.some((el) => el === passport.ecl)) {
            counter--;
            continue;
        }

        if (passport.pid.length !== 9) {
            counter--;
            continue;
        }
    }

    return counter;
}

function solve(fileName) {
    const input = readFile(fileName);
    const data = getPreparedData(input);
    const result = matchPassport(data);

    return result;
}

console.log(solve('input.txt')); // 114
