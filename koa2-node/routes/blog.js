const router = require('koa-router')()

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
    const query = ctx.query
    ctx.body = {
        error: 0,
        data: 123
    }
})


module.exports = router