// koa instance
const koa = require('koa');
const app = new koa();

// router 
const router = require('koa-router')();

app.use(async (ctx, next)=> {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
})
const fs = require('fs');

function logger (format) {
    format = format || ':method ":url"';
    return async function (ctx, next) {
        const str = format
        .replace(':method', ctx.method)
        .replace(':url', ctx.url);

        console.log(str);
        next();
    }
}
app.use(logger(':method :url'));

app.use(async (ctx, next)=> {
    await next();
    ctx.response.tpye = 'json';
    ctx.response.body = fs.createReadStream('package.json');
})




app.listen(3077);
console.log('runing in port ' + 3077);

