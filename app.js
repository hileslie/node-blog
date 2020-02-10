const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { get, set } = require('./src/db/redis');

// session数据
// const SESSION_DATA = {};

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

// 处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 解析 query
    const url = req.url;
    req.query = querystring.parse(url.split('?')[1]);

    // 解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })

    // 解析 session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {};
    //     }
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        set(userId, {});
    }
    get(userId).then(val => {
        req.session = val || {};
        req.sessionId = userId;
        // 处理postData
        getPostData(req).then(postData => {
            req.body = postData;

            // 路由处理
            const blogResult = handleBlogRouter(req, res);
            if (blogResult) {
                blogResult.then(blogData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(blogData));
                })
                return;
            }
            const userResult = handleUserRouter(req, res);
            if (userResult) {
                userResult.then(userData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(userData));
                })
                return;
            }

            // 未命中路由处理
            res.writeHead(404, {'Content-type': 'text/plan'});
            res.write('404 Not Found\n');
            res.end();
        })
    })
    

}

module.exports = serverHandle;