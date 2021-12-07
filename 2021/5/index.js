const { getFileContent } = require('../../utils');
const inputArray = getFileContent(`${__dirname}/input.txt`);

const prepareInput = (arr) => arr.map((line) => line.split(' -> '));

const getBoard = (data) => {
  let max = -Infinity;
  const lines = [];

  for (const [from, to] of data) {
    const [fromX, fromY] = from.split(',').map(Number);
    const [toX, toY] = to.split(',').map(Number);

    max = Math.max(fromX, toX, fromY, toY, max);
    lines.push({ fromX, fromY, toX, toY });
  }

  const board = new Array(max + 1)
    .fill(null)
    .map(() => new Array(max + 1).fill(0));

  return [board, lines];
};

const fillHorizontalLines = (board, lines) => {
  for (let { fromX, fromY, toX, toY } of lines) {
    if (fromX === toX || fromY === toY) {
      let minX = Math.min(fromX, toX);
      let minY = Math.min(fromY, toY);
      const maxX = Math.max(fromX, toX);
      const maxY = Math.max(fromY, toY);

      for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
          board[i][j] += 1;
        }
      }
    }
  }
};

const fillDiagonalLines = (board, lines) => {
  for (let { fromX, fromY, toX, toY } of lines) {
    if (fromX !== toX && fromY !== toY) {
      const deltaX = fromX > toX ? -1 : 1;
      const deltaY = fromY > toY ? -1 : 1;
      let i = fromY;
      let j = fromX;

      while (i !== toY + deltaY && j !== toX + deltaX) {
        board[i][j] += 1;
        i += deltaY;
        j += deltaX;
      }
    }
  }
};

const countDangerousPoints = (board, threshold) => {
  let counter = 0;

  for (const row of board) {
    for (const item of row) {
      if (item >= threshold) counter += 1;
    }
  }

  return counter;
};

const task1 = (data) => {
  const [board, lines] = getBoard(data);

  fillHorizontalLines(board, lines);

  return countDangerousPoints(board, 2);
};

const task2 = (data) => {
  const [board, lines] = getBoard(data);

  fillHorizontalLines(board, lines);
  fillDiagonalLines(board, lines);

  return countDangerousPoints(board, 2);
};

const preparedData = prepareInput(inputArray);
console.log(task1(preparedData), task2(preparedData)); // 7297, 21038
