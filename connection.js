const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/local', {
    // useMongoClient: true,
    autoIndex: false, //不用自动创建索引
    reconnectTries: Number.MAX_VALUE, //不停止尝试连接数据库
    reconnectInterval: 500, //多少毫秒尝试一次
    poolSize: 10,//最大连接池
    bufferMaxEntries: 0 //没有连接，立刻返回错误
}).then((() => {console.log('slls'), err=> {console.log(err)}}))