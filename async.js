function timeout(ms) {
    return new Promise ((reslove, reject) => {
        console.log('running');
        setTimeout(reslove, ms);
    })
}


async function asyncTime(value, ms) {
    await timeout(ms);
    await timeout(ms);
    console.log(value);
}
/* // 函数
async function a () {}
// 表达式
const b = async function () {}
// 对象
const c = { async foo() {}} */

asyncTime('hello world', 1000);

/* async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log) */

// 错误处理， 不中断代码

async function f() {
    try {
        await Promise.reject('出错了');
    } catch (e) {
        console.log(e);
    }
    return await Promise.resolve('世界，您好！');
}

f().then(e => {
    console.log( e)
})