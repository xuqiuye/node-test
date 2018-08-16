const WebSocket = require('ws');
const crypto = require('crypto');
const ws = new WebSocket('ws://127.0.0.1:50001');

ws.on('open', open.bind(this));

ws.on('close', function () {
    console.log('close...');
})

function md5(source) {
    const hash = crypto.createHash('md5');
    hash.update(source);
    return hash.digest('hex');
}



function handleMessage(req) {
    console.log(req);
    send(req) 
}

function open(req) {
    ws.on('message', handleMessage.bind(this));
    // let params = eval("(" + req +")");
    // console.log(typeof params)
    /* const authCode = params.auth_code;
    send({
        type: 'login_system_res',
        auth_code: md5(authCode)
    }); */
}

function send(resp) {
    let params = JSON.parse(resp);
    let authCode = params.auth_code;
    console.log('}}}}}}}}}}}');
    ws.send(JSON.stringify({
        type: 'login_system_res',
        auth_code: md5(authCode),
        seq: 0
    })); 

    /* setInterval(() => {
        console.log('aa');
    }, 1000) */
    console.log('/////////');
    ws.send(JSON.stringify(
        {
            type: 'login_req',
            phone: '13632247728',
            password: '111111',
            seq: 1
        }
    ))
    console.log('/////////|||||||')
    return ;
}