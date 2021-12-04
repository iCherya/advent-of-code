const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => {
  const winningNumbers = arr[0].split(',').map(Number);
  const boardsInput = arr.slice(2);

  const boards = {};
  let i = 0;

  for (const item of boardsInput) {
    if (item === '') {
      i += 1;
      continue;
    }

    if (!boards[i]) boards[i] = [];
    boards[i].push(
      item
        .split(' ')
        .filter(Boolean)
        .map(Number)
        .map((value) => {
          return { value };
        })
    );
  }

  return [winningNumbers, Object.values(boards)];
};

const solve = ([winningNumbers, boardsArray], winnerCondition) => {
  const boardsWinningStatus = boardsArray.map(() => false);

  const winnerConditionMap = {
    first: () => boardsWinningStatus.some(Boolean),
    last: () => boardsWinningStatus.every(Boolean)
  };

  const isWinningBoard = (board) => {
    const check = (line) => line.every(({ checked }) => checked);

    for (const row of board) {
      if (check(row)) return true;
    }

    for (let i = 0; i < board.length; i++) {
      const column = board.map((el) => el[i]);
      if (check(column)) return true;
    }

    return false;
  };

  const calculateBoardResult = (board, stopNumber) => {
    let total = 0;
    let checkedSum = 0;

    for (const row of board) {
      for (const item of row) {
        const { value, checked } = item;

        total += value;
        if (checked) checkedSum += value;
      }
    }

    return (total - checkedSum) * stopNumber;
  };

  for (const number of winningNumbers) {
    for (let i = 0; i < boardsArray.length; i++) {
      const board = boardsArray[i];

      for (const row of board) {
        for (const item of row) {
          if (item.value === number) {
            item.checked = true;

            if (isWinningBoard(board)) {
              boardsWinningStatus[i] = true;
            }

            const isGameOver = winnerConditionMap[winnerCondition]();
            if (isGameOver) {
              return calculateBoardResult(board, number);
            }
          }
        }
      }
    }
  }
};

const task1 = (data) => solve(data, 'first');
const task2 = (data) => solve(data, 'last');

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 41668, 10478
