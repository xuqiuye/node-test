const Websocket = require('ws');


const server = new Websocket.Server({port: 20006});

function noop() {
    // console.log('noop');
}

function heartbeat(param) {
    console.log(param)
    this.isAlive = true;
}

server.on('connection', function (socket) {
    socket.isAlive = true;
    socket.on('pong', heartbeat);
});

setInterval(function ping() {
    server.clients.forEach(function each(socket) {
        if (socket.isAlive === false) {
            return socket.terminate();
        }
        socket.isAlive = false;
        socket.ping(noop);
    });
}, 1000);