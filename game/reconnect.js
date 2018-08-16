const  WebSocket =  require('ws');

const ws = new WebSocket(`ws://127.0.0.1:50001/`);
ws.on('open', function open() {
    new Session(ws, {phone: 13800138001, password: '123456'});
})