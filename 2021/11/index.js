const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr.map((line) => line.split('').map(Number));

const task1 = (data) => {
  let round = 0;
  let flashes = 0;

  const increase = (i, j, exploded) => {
    if (data[i] === undefined) return;
    if (data[i][j] === undefined) return;

    if (exploded[`${i}-${j}`]) return;

    data[i][j] += 1;

    if (data[i][j] > 9) {
      data[i][j] = 0;
      exploded[`${i}-${j}`] = true;
      flashes += 1;

      increase(i - 1, j - 1, exploded);
      increase(i - 1, j, exploded);
      increase(i - 1, j + 1, exploded);
      increase(i, j - 1, exploded);
      increase(i, j + 1, exploded);
      increase(i + 1, j - 1, exploded);
      increase(i + 1, j, exploded);
      increase(i + 1, j + 1, exploded);
    }
  };

  while (round < 100) {
    const exploded = {};

    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[i].length; j += 1) {
        increase(i, j, exploded);
      }
    }

    round += 1;
  }

  return flashes;
};

const task2 = (data) => {
  let round = 0;
  let flashes = 0;

  const increase = (i, j, exploded) => {
    if (data[i] === undefined) return;
    if (data[i][j] === undefined) return;

    if (exploded[`${i}-${j}`]) return;

    data[i][j] += 1;

    if (data[i][j] > 9) {
      data[i][j] = 0;
      exploded[`${i}-${j}`] = true;
      flashes += 1;

      increase(i - 1, j - 1, exploded);
      increase(i - 1, j, exploded);
      increase(i - 1, j + 1, exploded);
      increase(i, j - 1, exploded);
      increase(i, j + 1, exploded);
      increase(i + 1, j - 1, exploded);
      increase(i + 1, j, exploded);
      increase(i + 1, j + 1, exploded);
    }
  };

  while (true) {
    const exploded = new Set();

    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[i].length; j += 1) {
        increase(i, j, exploded);
      }
    }
    round += 1;

    const sum = data.flat().reduce((a, c) => a + c, 0);
    if (sum === 0) return round;
  }
};

const preparedData = prepareInput(inputArray);
// console.log(task1(preparedData)); // 1717
console.log(task2(preparedData)); // 476
