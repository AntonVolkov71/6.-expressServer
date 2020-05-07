const fs = require('fs');

const foundFile = (filePath) => {
  return fs.existsSync(filePath);
};

module.exports = foundFile;
