const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr.map((line) => line.split(''));

const task1 = (data) => {
  const opening = ['(', '[', '{', '<'];
  const map = {
    ')': { amount: 0, opening: '(', price: 3 },
    ']': { amount: 0, opening: '[', price: 57 },
    '}': { amount: 0, opening: '{', price: 1197 },
    '>': { amount: 0, opening: '<', price: 25137 }
  };

  main: for (let line of data) {
    const stack = [line[0]];
    for (let i = 1; i < line.length; i++) {
      const current = line[i];

      if (opening.includes(current)) {
        stack.push(current);
      } else {
        const last = stack.pop();
        if (map[current].opening !== last) {
          map[current].amount += 1;
          continue main;
        }
      }
    }
  }

  return Object.values(map)
    .map(({ amount, price }) => amount * price)
    .reduce((acc, curr) => acc + curr, 0);
};

const task2 = (data) => {
  const map = { '(': ')', '{': '}', '[': ']', '<': '>' };
  const points = { ')': 1, ']': 2, '}': 3, '>': 4 };
  const scores = [];

  for (const line of data) {
    const stack = [];
    let isCorrupted = false;

    for (const char of line) {
      if ('([{<'.includes(char)) {
        stack.push(map[char]);
      } else {
        if (stack.pop() !== char) {
          isCorrupted = true;
          break;
        }
      }
    }

    if (!isCorrupted && stack.length > 0) {
      const closingChars = stack.reverse().join('');
      let total = 0;
      for (const char of closingChars) {
        total = total * 5 + points[char];
      }
      scores.push(total);
    }
  }

  const sorted = scores.sort((a, b) => a - b);
  const middleIdx = Math.floor(scores.length / 2);

  return sorted[middleIdx];
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 339537, 2412013412
