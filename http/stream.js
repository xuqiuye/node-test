const http = require('http');

const app = http.createServer((req, res) => {

    let body = '';
    req.setEncoding('utf8');

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            if(typeof data === 'object') {
                data.name = 'test for stream, writing';
            }
            // console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(data));
            res.end();
        } catch (error) {
            res.statusCode = 400;
            return res.end(`错误: ${error.message}`);
        }
    })
});

app.listen(3888);