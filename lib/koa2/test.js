const Koa = require('./index');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log(1)
    await next();
    console.log(2)
});

// x-response-time

app.use(async (ctx, next) => {
    console.log(3)
    await next();
    console.log(4)
});

// response

app.use(async ctx => {
    console.log(5)
    ctx.res.end('Hello World');
});

app.listen(3000);