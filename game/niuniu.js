const  R = require('ramda');
const  WebSocket =  require('ws');
const  crypto = require('crypto');
const  pino = require('pino');
const logger = pino();


// 测试用户退出异常
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function md5(source) {
    const hash = crypto.createHash('md5');
    hash.update(source);
    return hash.digest('hex');
}

class Session {
    // save the socket instance
    constructor(socket, user) {
        this._socket = socket;
        // receive message from server
        this._socket.on('message', this.handleMessage.bind(this));

        // is close
        this._hasClosed = false;

        // how many time recevie from server
        this._recvSeq = 0;
        // how many time send to server
        this._sendSeq = 0;

        // socket error event
        this._socket.on('error', (e) => {
            logger.error(e);
            this.close();
        });
        this.cancel_bet = false;
        // socket close event
        this._socket.on('close', () => {
            logger.error('这么任性吗？session on close session_id');
            this.doClose();
        });
        this._count = 0;

        this._user = user;

        this.is_in_game = true;
    }

    doClose() {
        if (! this._hasClosed) {
            this._hasClosed = true;
            this.closeHeartBeat();
        } 
    }

    doHeartBeat() {
        this._hearbeatTimer = setInterval(() => {
            this.ping();
        }, 1000 * 60 * 60);
    }

    closeHeartBeat() {
        try {
            clearInterval(this._hearbeatTimer);
        } catch (e) {
            logger.error(e);
        }
        
        this._hearbeatTimer = null;
    }

    ping() {
        try {
            this.send({
                type: 'heartbeat'
            });
        } catch (e) {
            logger.error(e);
        }
    }

    send(json) {
        try {
            const sendJson = Object.assign({seq: this._sendSeq}, json);
            this._socket.send(JSON.stringify(sendJson));
            ++this._sendSeq;
        } catch (e) {
            logger.error(`发送错误:${e}`);
            this.close();
        }
    }

    close() {
        try {
            this.doClose();
            this._socket.close();
        } catch (e) {
            logger.error(e);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleMessage(message) {
        try {
            const request = JSON.parse(message);
            if (!R.isNil(request) && R.is(String, request.type) && R.is(Function, this[request.type])) {

                if (this._recvSeq !== request.seq) {
                    throw new Error('session recv seq error');
                }

                ++this._recvSeq;
                this[request.type](request);
            } else {
                logger.error('session handleMessage error by : ', request);
                throw new Error('custom request error');
            }
        } catch (e) {
            logger.error(`发送成功吗${e}`);
            this.close();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    heartbeat() {
        if(!this._isLogin && this._count > 6) {
            this._count = 0;
            this.send({
                type: 'enter_game_req',
                game_id: 100002
            });
        }
    }

    return_game_notification() {
        console.log('游戏通知');
    }
    baijiale_desktop_status_notification(param) {
        console.log('百家乐通知页面！！！！');
        /* this.send({
            type: 'quit_game_req',
            game_id: 100003
        }) */
    }

    niuniu_desktop_status_notification(param) {
        this._count++;
        if(this._count > 6) {
            console.log(JSON.stringify(param));
            console.log(this._count);
            this.send({
                type: 'quit_game_req',
                game_id: 100002
            });
        }
    }

    login_system_req(param) {
        const authCode = param.auth_code;
        this.send({
            type: 'login_system_res',
            auth_code: md5(authCode)
        });

        this.doHeartBeat();

        this.send({
            type: 'login_req',
            phone: this._user.phone,
            password: this._user.password
        });
    }


    // 登录回调
    login_res(param) {
        logger.trace('login_res get : ', param);
        if (!param.is_in_game) {
            this.send({
                type: 'enter_game_req',
                game_id: 100002
            });
        }
    }

    get_user_info_res(param) {
        logger.trace('get_user_info_res get : ', param);
    }

    // 进入游戏
    enter_game_res(param) {
        logger.trace('enter_game_res get : ', param);
    }


    // 百家乐 退出游戏
    game_quit_res(param) {
        if(param.error_code === 0) {
            this.is_in_game = false;
            console.log('退出成功---------------');
        } else {
            console.log(param);
        }
    }

    longhu_bet_res(param) {
        logger.trace('longhu_bet_res get : ', param);
    }

    longhu_cancel_bet_res(param) {
        logger.trace('longhu_cancel_bet_res get : ', param);
    }

    notice_notification(param) {
        logger.trace('get_user_info_res get : ', param);
    }

    longhu_desktop_status_notification(param) {
        logger.trace('longhu_desktop_status_notification get : ', param);
    }

    return_longhu_notification(param) {
        logger.trace('return_longhu_notification get : ', param);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getSMSCodeReq() {
        this.send({
            type: 'get_sms_code_req',
            phone: '13632247728'
        });
    }
}
/* var array = [18814129413, 13800138000, 13678933299, 18664790286, 13353889135, 13800013800, 13800013801, 13800138002, 13798177648, 13800138001];
// var array = [13800138001];
for(let i = 0; i < array.length; i++) {
    const ws = new WebSocket(`ws://127.0.0.1:50001/`);
    ws.on('open', function open() {
        new Session(ws, {phone: array[i], password: '123456'});
    })
} */

const ws = new WebSocket(`ws://192.168.0.115:50001/`);
ws.on('open', function open() {
    new Session(ws, {phone: 13800138001, password: '123456'});
})


/* process.on('SIGINT', () => {
    console.log('我看看！！！')
}) */