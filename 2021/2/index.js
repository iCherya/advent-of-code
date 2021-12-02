const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) =>
  arr
    .map((line) => line.split(' '))
    .map(([direction, valueAsString]) => [direction, Number(valueAsString)]);

const task1 = (data) => {
  let horizontalPosition = 0;
  let depth = 0;

  data.forEach(([direction, value]) => {
    switch (direction) {
      case 'forward':
        horizontalPosition += value;
        break;
      case 'down':
        depth += value;
        break;
      case 'up':
        depth -= value;
        break;
      default:
        break;
    }
  });

  return horizontalPosition * depth;
};

const task2 = (data) => {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  data.forEach(([direction, value]) => {
    switch (direction) {
      case 'forward':
        horizontalPosition += value;
        if (aim) {
          depth += aim * value;
        }
        break;
      case 'down':
        aim += value;
        break;
      case 'up':
        aim -= value;
        break;
      default:
        break;
    }
  });

  return horizontalPosition * depth;
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 2187380, 2086357770
