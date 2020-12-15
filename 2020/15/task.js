function solve(input, n) {
    let lastSaid;
    const said = {};

    for (let i = 0; i < input.length; i++) {
        const number = input[i];
        said[number] = [0, i + 1];

        lastSaid = number;
    }

    let i = input.length;
    while (i < n) {
        if (said[lastSaid][0] === 0) {
            lastSaid = 0;
            said[lastSaid][0] = said[lastSaid][1];
            said[lastSaid][1] = i + 1;
        } else {
            const diff = said[lastSaid][1] - said[lastSaid][0];
            lastSaid = diff;

            if (!said[lastSaid] && said[lastSaid] !== 0) {
                said[lastSaid] = [0, i + 1];
            } else {
                said[lastSaid][0] = said[lastSaid][1];
                said[lastSaid][1] = i + 1;
            }
        }

        i++;
    }

    return lastSaid;
}

console.log(solve([16, 1, 0, 18, 12, 14, 19], 2020)); // task1: 929
console.log(solve([16, 1, 0, 18, 12, 14, 19], 30000000)); // tas2: 16671510
