const fs = require('fs');  
const path = require('path');

function findAlbum(p){
    return new Promise((resolve,reject) => {
        const directoryPath = path.join('./api/SongAlbum/'+ p);
        fs.readdir(directoryPath, function (err, files,directoryPath) {
            if (err) {
                reject(err)
                return console.log('Unable to scan directory: ' + err);
            } else {
                resolve(files,directoryPath)
            }
        });
    })  
}

module.exports = findAlbum;
