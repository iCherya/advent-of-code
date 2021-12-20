const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr.map((line) => line.split(''));

const task1 = (data) => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const current = Number(data[i][j]);

      const left = data?.[i]?.[j - 1] || Infinity;
      const top = data?.[i - 1]?.[j] || Infinity;
      const right = data?.[i]?.[j + 1] || Infinity;
      const bottom = data?.[i + 1]?.[j] || Infinity;

      const min = Math.min(...[left, top, right, bottom].map(Number));

      if (current < min) sum += 1 + current;
    }
  }

  return sum;
};

const task2 = (data) => {
  const height = data.length;
  const width = data[0].length;

  const peaks = new Array(height)
    .fill(null)
    .map((_, i) => new Array(width).fill(null).map((_, j) => (data[i][j] === '9' ? 1 : 0)));

  const getNeighbors = (i, j) => {
    if (peaks[i][j] === 1) return 0;
    peaks[i][j] = 1;

    let neighbors = 1;

    if (i - 1 >= 0) neighbors += getNeighbors(i - 1, j);
    if (i + 1 < peaks.length) neighbors += getNeighbors(i + 1, j);
    if (j - 1 >= 0) neighbors += getNeighbors(i, j - 1);
    if (j + 1 < peaks[i].length) neighbors += getNeighbors(i, j + 1);

    return neighbors;
  };

  const zones = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const size = getNeighbors(i, j);
      if (size) zones.push(size);
    }
  }

  return zones
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, c) => a * c, 1);
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData));
