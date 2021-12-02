const fs = require('fs');

const getFileContent = (filePath) =>
  fs.readFileSync(filePath, 'utf8').split('\n');

module.exports = { getFileContent };
