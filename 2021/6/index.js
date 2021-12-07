const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr[0].split(',').map(Number);

const solve = (data, targetDays) => {
  const queue = new Array(9).fill(0);

  for (const fish of data) {
    queue[fish] += 1;
  }

  for (let i = 0; i < targetDays; i++) {
    const fishesToReproduce = queue.shift();
    queue.push(fishesToReproduce);
    queue[6] += fishesToReproduce;
  }

  return queue.reduce((acc, curr) => acc + curr, 0);
};

const task1 = (input) => solve(input, 80);

const task2 = (input) => solve(input, 256);

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 361169
