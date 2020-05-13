const fs = require('fs');

const readerFile = (filePath, callback) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(data);
  });
};

module.exports = readerFile;
