const Websocket = require('ws');

const client = new Websocket('ws://127.0.0.1:20006');

client.on('open', function open() {
    try {
        client.send('有朋自远方来，不亦说乎！');
        client.on('message', function incoming(message) {
            console.log(message);
            // client.close();
        })
        
        client.on('ping', function ping(param) {
            console.log(param);
        });

        client.on('close', function () {
            console.log('close the socket!');
        })
    } catch  (e) {
        client.close();
    }
    
});

