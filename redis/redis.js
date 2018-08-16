'use strict';
const Redis = require('ioredis');

const redis = new Redis(6379, '192.168.50.44');

/* redis.set('key', 'values', function (err, data) {
    console.log(data);
})
redis.setnx('key', 'value', function (err, data) {
    console.log(data)
});

redis.get('key', function(err, data) {
    console.log(data);
}); */

const crypto = require('crypto');
class Locker {
    constructor(redis) {
      this.redis   = redis;
      this.lockMap = new Map();
  
      //定义lua脚本让它原子化执行
      this.redis.defineCommand('lua_unlock', {
        numberOfKeys: 1,
        lua         : `
          local remote_value = redis.call("get",KEYS[1])
          
          if (not remote_value) then
            return 0
          elseif (remote_value == ARGV[1]) then
            return redis.call("del",KEYS[1])
          else
            return -1
          end`
      });
    }

    /**
     * 锁定key，如已被锁定会抛错
     * @param key
     * @param expire    过期时间(毫秒)
     * @return {Promise<void>}
     */
    async lock (key, expire = 1000) {
        const value = crypto.randomBytes(16).toString('hex');
        // this.delay(6000);
        let result = await this.redis.set(key, value, 'NX', 'PX', expire);
        if(result === null) throw new Error('lock error: key already exists');

        this.lockMap.set(key, {value, expire, time: Date.now()});
        return 'OK';
    }

    /**
     * 解锁key，无论key是否存在，解锁是否成功，都不会抛错（除网络原因外），具体返回值:
     * null: key在本地不存在    0:key在redis上不存在    1:解锁成功      -1:value不对应，不能解锁
     * @param key
     * @return {Promise<*>}
     */
    async unLock (key) {
        if(!this.lockMap.has(key)) return null;
        let {value, expire, time} = this.lockMap.get(key);
        this.lockMap.delete(key);

        return await this.redis.lua_unlock(key, value);
    }

    /**
     * 每隔interval时间就尝试一次锁定，当用时超过waitTime就返回失败
     * @param key
     * @param expire
     * @param interval
     * @param waitTime
     * @return {Promise<void>}
     */
    async waitLock(key, expire = 1000, interval = 500, waitTime = 5000) {
        let start_time = Date.now();
        let result;
        while((Date.now() - start_time) < waitTime) {
            result = await this.lock(key, expire).catch(() => {});
            if (result === 'OK') { //设置成功 并解锁
                this.unLock(key);
                return 'OK';
            }
            else await delay(interval);
        }
        throw new Error('waitLock timeout');
    }

    async delay (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const locker = new Locker(redis);

async function test(){
    let a1 = await locker.waitLock('b');
    let a2 = await locker.waitLock('c');
    let a3 = await locker.waitLock('b');
    let a4 = await locker.waitLock('c');
    let a5 = await locker.waitLock('b');
    let a6 = await locker.waitLock('c');
    let a7 = await locker.waitLock('b');
    let a8 = await locker.waitLock('c');
    console.log(a1, a2, a3, a4, a5, a6, a7, a8);
    /* await locker.lock('c')
    await locker.lock('d') */

    /* redis.mget('a','b','c', function (err, data) {
        console.log(data);
    }) */
    // redis.
}
test();
/* redis.get('a', function (err, data) {
    console.log(data);
}) */
