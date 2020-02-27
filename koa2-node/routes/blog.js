const router = require('koa-router')()

const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
    // 获取列表
	let author = ctx.query.author || '';
	const keyword = ctx.query.keyword || '';
	if (ctx.query.isadmin) {
		if (!ctx.session.username) {
			// 未登录
			ctx.body = new ErrorModel('未登录');
			return;
		}
		author = ctx.session.username;
	}
	const listData = await getList(author, keyword);
	ctx.body = new SuccessModel(listData);
})

router.get('/detail', async (ctx, next) => {
	console.log('ctx.query: ', ctx.query.id);
	const id = ctx.query.id;
	const data = await getDetail(id)
	ctx.body = new SuccessModel(data);
});

router.post('/new', loginCheck, (ctx, next) => {
	ctx.request.body.author = ctx.session.username;
	const data = newBlog(ctx.request.body);
	ctx.body = new SuccessModel(data);
})

router.post('/update', loginCheck, (ctx, next) => {
	const id = ctx.query.id;
	const val = updateBlog(id, ctx.request.body);
	if (val) {
        ctx.body = new SuccessModel(val);
    } else {
        ctx.body = new ErrorModel('更新失败');
    }
})

router.post('/del', loginCheck, (ctx, next) => {
	const id = ctx.query.id;
	const author = ctx.session.username;
	const val = delBlog(id, author);
	if (val) {
        ctx.body = new SuccessModel(val);
    } else {
        ctx.body = new ErrorModel('删除失败');
    }
})

module.exports = router