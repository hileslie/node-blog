const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const url = req.url;
        console.log('url: ', url);
        console.log('method: ', req.method);
        req.query = querystring.parse(url.split('?')[1]);
        console.log('query: ', req.query);
        res.end(JSON.stringify(req.query));
    }

    if (req.method === 'POST') {
        console.log('content-type: ', req.headers['content-type']);
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('end', () => {
            console.log('postData: ', postData);
            res.end('done');
        })
    }
});

server.listen(8000);