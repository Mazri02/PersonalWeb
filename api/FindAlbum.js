const fs = require('fs');
const path = require('path');

function findAlbum(p) {
  return new Promise((resolve, reject) => {
    const directoryPath = path.join('SongAlbum' + p);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        reject(err);
        return console.log('Unable to scan directory: ' + err);
      } else {
        resolve(files, directoryPath);
      }
    });
  });
}

module.exports = findAlbum;
