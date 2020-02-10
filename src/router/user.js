const { login } = require('../controller/user');
const { SuccessModel, ErrorModel} = require('../model/resModel');

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    // 登录
    if (method === 'GET' && path === '/api/user/login') {
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                return new SuccessModel();
            }
            return new ErrorModel('登录失败');
        })
    }

    // 登录验证
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }))
        }
        return Promise.resolve(new ErrorModel('验证失败'));
    }
}

module.exports = handleUserRouter;