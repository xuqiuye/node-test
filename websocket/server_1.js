const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();

const ws1 = new WebSocket.Server({noServer: true});
const ws2 = new WebSocket.Server({noServer: true});

ws1.on('connection', function connection(ws) {
    ws1.on('message', function incoming(message) {
        console.log('message')
    })
});
  
ws2.on('connection', function connection(ws) {
    ws1.on('message', function incoming(message) {
        console.log('message---0')
    })
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;

    if (pathname === '/foo') {
        ws1.handleUpgrade(request, socket, head, function done(ws) {
        ws1.emit('connection', ws, request);
        });
    } else if (pathname === '/bar') {
        ws2.handleUpgrade(request, socket, head, function done(ws) {
        ws2.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(20005);