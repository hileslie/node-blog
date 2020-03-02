const http = require('http');

const server = http.createServer((req, res) => {
    console.log(Date.now())
    console.error('错误', Date.now())

    // 模拟错误
    if (req.url === '/err') {
        throw new Error('/err 出错了');
    }

    res.setHeader('Content-type', 'application/json');
    res.end(
        JSON.stringify({
            error: 0,
            msg: 'pm2 server2'
        })
    )
})

server.listen(8000)
console.log('server is listening on port 8000');