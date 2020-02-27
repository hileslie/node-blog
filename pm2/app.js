const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.end(
        JSON.stringify({
            error: 0,
            msg: 'pm2 server'
        })
    )
})

server.listen(8000)
console.log('server is listening on port 8000');