const fs = require('fs');
const path = require('path');
console.log('__d: ', __dirname)

const fileName1 = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, 'data-bak.txt');

const readStream = fs.createReadStream(fileName1);
const writeStream = fs.createWriteStream(fileName2);

readStream.pipe(writeStream);
readStream.on('data', chunk => {
    console.log('chunk: ', chunk.toString());
})
readStream.on('end', () => {
    console.log('copy-done');
})