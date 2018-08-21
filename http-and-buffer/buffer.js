const http = require('http');
const bodyParser = require('body-parser');

const app = http.createServer((req, res) => {
    let body = '';
    // request received data
    // 监听 HTTP传输的数据 http报文
    req.on('data', (chunk) => {
        // console.log(typeof chunk)
        // const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
        body += chunk;
    });
    // console.log(req.headers)
    // console.log(req.)
    // req.h
    let buf = Buffer.from('我是从哪里来，往哪里去！')
    // 如果我要分析 HTTP传输过来的 起始行, 请求头, 数据主体
    req.on('end', () => {
        // res.setHeader('Content-type', 'application/json; charset=utf-8');
        res.setHeader('Content-type', 'test/html; charset = utf - 8');
        var data = JSON.parse(body)
        if (typeof data === 'object') {
            data.type = "the data is a object type"
        }
        console.log('fast?');
        // res.setHeader('Charset', 'utf-8')
        res.write(buf)
        res.end();
    })
});

app.on('request', (request, response) => {
    const { method, url } = request;
    console.log(method, url)
})


app.on('connect', (req, cltSockt, head) => {
    console.log(req, cltSockt, head)
})
console.log('监听某个端口');
app.listen(3003);