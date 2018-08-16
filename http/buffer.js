const http = require('http');

const app = http.createServer((req, res) => {
    let body = ''; 

    // request received data
    req.on('data', (chunk) => {
        const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
        body += buf;
    });

    req.on('end', () => {
        res.write(body);
        res.end();
    })
});

app.listen(6000);