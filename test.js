// create object test
class Test 
{
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return this.x + '  ' + this.y; 
    }
}

var t = new Test('first name', 'last name');



const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:50001');

ws.on('open', function open() {
    ws.send('hello world');
});

ws.on('close', function () {
    console.log('close...');
})

ws.on('message', function incoming(data) {
  console.log(data);
});
