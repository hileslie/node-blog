const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n');
}

// 生成 write Stream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a' // 打开文件用于追加。如果文件不存在，则创建该文件
    })
    return writeStream;
}

// 写访问日志 access.log
const accessWriteStream = createWriteStream('access.log');
function access(log) {
    writeLog(accessWriteStream, log)
}

// 写错误日志 error.log

// 写事件日志 event.log

module.exports = {
    access
}