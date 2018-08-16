const  Websocket = require('ws');

const server = new Websocket.Server({
    port: 20004
});

server.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('接收到客户端消息: ' + message);
        console.log(server.clients.size);
        send('来而不往非礼也！');
    });

    function send(message) {
        ws.send(message);
    }
});
