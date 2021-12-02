const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr.map(Number);

const task1 = (data) => {
  let counter = 0;

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];

    if (curr > prev) counter += 1;
  }

  return counter;
};

const task2 = (data) => {
  let counter = 0;
  let prev = data.slice(0, 3).reduce((acc, curr) => acc + curr);

  for (let i = 3; i < data.length; i++) {
    const curr = prev - data[i - 3] + data[i];

    if (curr > prev) counter += 1;
    prev = curr;
  }

  return counter;
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 1316, 1344
