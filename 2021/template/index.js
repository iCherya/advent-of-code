const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr;

const task1 = (data) => {};

const task2 = (data) => {};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData));
