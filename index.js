const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ 
    noServer: true  
});


wss.on('connection', function connection(ws) {
  ws.close.bind('sc')
});

function sc() {
    console.log('sd');
}

server.on('upgrade', function upgrade(request, socket, head) {
    console.log('skdk')
})
server.listen(8081);

process.on('SIGINT', function () {
    console.log('sdf')
    return ;
})