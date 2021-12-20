const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) =>
  arr.map((line) => {
    const [left, right] = line
      .split(' | ')
      .map((part) =>
        part.split(' ').map((letters) => letters.split('').sort().join(''))
      );

    return { left, right };
  });

const task1 = (data) =>
  data
    .map(({ right }) => right)
    .map((arr) => arr.map((el) => el.length))
    .flat()
    .filter((item) => [2, 4, 3, 7].includes(item)).length;

const task2 = (data) => {
  let counter = 0;
  const includes = (a, b) => {
    const set = new Set([...a]);
    return [...b].every((x) => set.has(x));
  };

  for (const { left, right } of data) {
    const digits = {
      1: left.find((x) => x.length === 2),
      4: left.find((x) => x.length === 4),
      7: left.find((x) => x.length === 3),
      8: left.find((x) => x.length === 7)
    };

    digits[6] = left.find((x) => x.length === 6 && !includes(x, digits[1]));
    digits[9] = left.find(
      (x) => x.length === 6 && x !== digits[6] && includes(x, digits[4])
    );
    digits[0] = left.find(
      (x) => x.length === 6 && x !== digits[6] && x !== digits[9]
    );
    digits[3] = left.find((x) => x.length === 5 && includes(x, digits[1]));
    digits[5] = left.find(
      (x) => x.length === 5 && x !== digits[3] && includes(digits[6], x)
    );
    digits[2] = left.find(
      (x) => x.length === 5 && x !== digits[3] && x !== digits[5]
    );

    const translationTable = Object.fromEntries(
      Object.entries(digits).map((x) => x.reverse())
    );
    const translated = Number(
      right.map((signal) => translationTable[signal]).join``
    );

    counter += translated;
  }

  return counter;
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 355, 983030
