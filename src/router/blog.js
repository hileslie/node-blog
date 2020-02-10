const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resModel');
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
        req.body.author = 'zhangsan';
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    // 更新
    if (POST && path === '/api/blog/update') {
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
        const author = 'zhangsan'; // 校验用户，保证不被误删除
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