const  R = require('ramda');
const  WebSocket =  require('ws');
const  crypto = require('crypto');
const  pino = require('pino');
const mock = require('mockjs');
const Random = mock.Random;
const logger = pino();

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
            logger.error('session on close session_id');
            this.doClose();
        });
        this._count = 0;

        this._user = user;
        this._reconnection = false;
    }

    doClose() {
        //if (! this._hasClosed) {
        this._hasClosed = true;
        this.closeHeartBeat();
        // } 
    }

    doHeartBeat() {
        this._hearbeatTimer = setInterval(() => {
            this.ping();
        }, 5000);
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
        console.log('关了吗?' + JSON.stringify(json));
        try {
            const sendJson = Object.assign({seq: this._sendSeq}, json);
            this._socket.send(JSON.stringify(sendJson));
            ++this._sendSeq;
        } catch (e) {
            logger.error(e);
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

                // console.log(this._count + '---------' + JSON.stringify(request));
                logger.info('recv message client : ', request);

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
            logger.error(e);
            this.close();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    heartbeat() {
        console.log('心跳')
    }

    return_game_notification() {
        console.log('游戏通知');
    }
    broadcast_res(param) {
        console.log('sd');
    }
    // 百家乐
    baijiale_desktop_status_notification(param) {
        console.log('121212');
        (async () =>  {
            const { stage } = param;
            if(stage == 0 && this._count === 0) {
                for(let i=0; i<= 4; i++) {
                    await sleep(1000);
                    this.send_bet(i);
                    this._count++;
                }
            } else if(stage === 1) {
                this._count = 0;
            }
        })();
       /*  if(stage === 0) {
            this.send({
                type: 'quit_game_req',
                game_id: 100003
            })
        } */
        
    }

    login_system_req(param) {

        const authCode = param.auth_code;
        this.send({
            type: 'login_system_res',
            auth_code: md5(authCode)
        });

        this.doHeartBeat();

        /* this.send({
            type: 'reg_req',
            phone: 13800138321,
            password: 123456,
            promotion_code: '88888888',
            sms_code: 4455
        }) */
        this.send({
            type: 'login_req',
            phone: this._user.phone,
            password: this._user.password
        });
        /* this.send({
            type: 'reconnect_game_req',
            user_id: 3658630448,
            game_id: 100003
        }); */
    }

    get_sms_code_res(param) {
        const { send_success } = param;
        logger.trace('get_sms_code_res get : ', param);

        // this.send({
        //     type: 'reg_req',
        //     phone: '13800138000',
        //     sms_code: sms_code,
        //     password: '111111'
        // });
    }

    reg_res(param) {
        logger.info('注册呀')
        logger.trace('reg_res get : ', param);

    }

    // 登录回调
    login_res(param) {
        logger.trace('login_res get : ', param);
        if(param.error_code === 0) {
            this.send({
                type: 'edit_user_name_req',
                user_id: 2095732949,
                name: Random.cname()
            })
            /* if (! param.is_in_game) {
                this.send({
                    type: 'enter_game_req',
                    game_id: 100003
    }2095732949
                });
            } */
        } else {
            console.log('登录失败！！！！')
        }

        /* this.send({
            type: 'get_user_info_req',
            user_id: userId
        }); */
    }

    get_user_info_res(param) {
        logger.trace('get_user_info_res get : ', param);
    }

    edit_user_name_res(param) {
        logger.info(param);
    }
    // 下注
    send_bet() {
        this.send({
            type: 'baijiale_bet_req',
            amount: Random.integer(1, 5) * 100,
            bet_type: Random.integer(0, 4), // 0 和 1 闲 2 庄 3 对闲 4 对庄
            attached: 'XXXXXXXdX'
        });
    }
    // 进入游戏
    enter_game_res(param) {
        logger.trace('enter_game_res get : ', param);
    }

    baijiale_bet_res(param) {
        if(param.error_code === 0 ) {
            console.log(`下注成功,等待下注！！！${this._count}`);
        }
        /* else {
            (async () => {
                await sleep(1000);
                this.send_bet();
            })()
        } */
    }

    

    reconnect_game_res(param) {
        console.log(param)
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

    force_disconnect_by_admin_notification(param) {
        console.log(param);
        console.log('kssssssssssssssssssssssssssss')
        this.close();
    }

    force_disconnect_notification() {
        this.close();
    }

    // 百家乐 退出游戏
    game_quit_res(param) {
        if(param.error_code === 0) {
            this._reconnection = true;
            console.log('退出成功');
        }
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

const ws = new WebSocket(`ws://127.0.0.1:50001`);
ws.on('open', function open() {
    new Session(ws, {phone: 13800138231, password: '123456'});
})
// 13353889135
// 18664790286
// 13800138001