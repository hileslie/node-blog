var express = require('express');
var router = express.Router();
const { 
    login
} = require('../controller/user');
const { SuccessModel, ErrorModel} = require('../model/resModel');

router.post('/login', function (req, res, next) {
    // 登录
    const {
        username,
        password
    } = req.body;
    const result = login(username, password);
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username;
            req.session.realname = data.realname;

            res.json(new SuccessModel());
            return;
        }
        res.json(new ErrorModel('登录失败'));
    })
});

router.get('/login-test', function(req, res, next) {
    if (req.session.username) {
        res.json(
            {
                error: 0,
                msg: '登录成功'
            }
        )
        return;
    }
    res.json({
        error: -1,
        msg: '未登录'
    })
})

module.exports = router;