const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr[0].split(',').map(Number);

const task1 = (data) => {
  const len = data.length;
  let min = Infinity;
  let distance = 1;

  while (distance < len) {
    let currentSum = 0;

    for (const currentPosition of data) {
      const currentDiff = Math.abs(distance - currentPosition);
      currentSum += currentDiff;
    }

    min = Math.min(min, currentSum);
    distance++;
  }

  return min;
};

const task2 = (data) => {
  const len = data.length;
  let min = Infinity;
  let distance = 1;

  while (distance < len) {
    let currentSum = 0;

    for (const currentPosition of data) {
      let currentDiff = Math.abs(distance - currentPosition);

      while (currentDiff > 0) {
        currentSum += currentDiff--;
      }
    }

    min = Math.min(min, currentSum);
    distance++;
  }

  return min;
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 337833, 96678050
