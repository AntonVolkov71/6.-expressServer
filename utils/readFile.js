const fs = require('fs');

const readerFile = (filePath, callback) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return callback(err);
    }
    const jsonInfo = JSON.parse(data);
    return callback(jsonInfo);
  });
};

module.exports = readerFile;
