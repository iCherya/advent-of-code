const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr;
const getDecimal = (binary) => parseInt(binary, 2);

const task1 = (data) => {
  const len = data[0].length;
  const counts = new Array(len).fill(0);

  data.forEach((binary) => {
    binary.split('').forEach((bit, index) => {
      if (bit === '1') counts[index] += 1;
      else counts[index] -= 1;
    });
  });

  const commonBinaryValue = counts
    .map((item) => (item > 0 ? '1' : '0'))
    .join('');
  const epsilonBinaryValue = counts
    .map((item) => (item > 0 ? '0' : '1'))
    .join('');

  return getDecimal(commonBinaryValue) * getDecimal(epsilonBinaryValue);
};

const task2 = (data) => {
  const getCount = (array, positionIndex) => {
    let count = 0;

    array.forEach((binary) => {
      count += binary[positionIndex] === '1' ? 1 : -1;
    });

    return count;
  };

  const getFilteredValue = (arr, commonType) => {
    let filtered = [...arr];
    let idx = 0;
    const reversedValues = { 0: '1', 1: '0' };

    while (filtered.length > 1) {
      let commonValue = getCount(filtered, idx) >= 0 ? '1' : '0';

      if (commonType === 'least') {
        commonValue = reversedValues[commonValue];
      }

      filtered = filtered.filter((binary) => binary[idx] === commonValue);
      idx += 1;
    }

    return filtered[0];
  };

  const oxygenValue = getDecimal(getFilteredValue(data, 'most'));
  const co2Value = getDecimal(getFilteredValue(data, 'least'));

  return oxygenValue * co2Value;
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 4118544, 3832770
