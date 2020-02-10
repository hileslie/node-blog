const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resModel');

// 登录校验函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    const id = req.query.id;

    const GET = method === 'GET';
    const POST = method === 'POST';

    // 获取列表
    if (GET && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }
    // 获取详情
    if (GET && path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    // 新建
    if (POST && path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    // 更新
    if (POST && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('更新失败');
            }
        })
    }
    // 删除
    if (POST && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        const author = req.session.username;
        const result = delBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('删除失败');
            }
        })
    }
}

module.exports = handleBlogRouter;