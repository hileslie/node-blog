const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('请求开始', req.method, req.url)
    next();
})

app.use((req, res, next) => {
    console.log('处理cookie')
    req.cookie = {
        userId: '123456789'
    }
    next();
})

app.use((req, res, next) => {
    console.log('处理postdata')
    setTimeout(() => {
        req.body = {
            a: 1,
            b: 2
        }
        next(); 
    })
})

app.use('/api', (req, res ,next) => {
    console.log('处理API路由')
    next();
})

app.get('/api', (req, res ,next) => {
    console.log('get API路由')
    next();
})

app.post('/api', (req, res ,next) => {
    console.log('post API路由')
    next();
})

function loginCheck(req, res, next) {
    // console.log('登录成功')
    // setTimeout(() => {
    //     next()
    // })
    console.log('登录失败')
    setTimeout(() => {
        res.json({
            error: -1,
            msg: '登录失败'
        })
    })
}

app.get('/api/get-cookie', loginCheck, (req, res ,next) => {
    console.log('get cookie');
    res.json({
        error: 0,
        data: req.cookie
    })
})

app.post('/api/post-data', (req, res ,next) => {
    console.log('post data');
    res.json({
        error: 0,
        data: req.body
    })
})

app.post((req, res ,next) => {
    console.log('处理404');
    res.json({
        error: -1,
        msg: '404'
    })
})

app.listen(3001, () => {
    console.log('server is running');
})