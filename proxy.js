const mongoose = require('mongoose');
const mock = require('mockjs');
const random = mock.Random;

const conn = mongoose.createConnection('mongodb://127.0.0.1/game');

const schema = mongoose.Schema,
    objectId = schema.ObjectId;

const proxy = new schema({
    uid: objectId
})

/* proxy.path('uid').set(function(v) {
    return v;
    // return capitalize(v);
}) */

//用户的schema
const userSchema = new schema({
    username: {type: String},
    password: {type: String},
    depth: {type: Number},
    is_proxy: Number,
    percentage: Number,
    status: Number,
    created_at: Date,
    created_by: Number,
    created_name: String,
    remark: String
});


const userModel = conn.model('user', userSchema);
const proxyModel = conn.model('proxy', proxy);

const query = userModel.findOne();
const promise = query.exec();
// 此处代码逻辑
/**
 * 1、获取当前代理者
 * 2、生成该代理的子代理
 * 3、根据uid,获取当前代理的所有父级代理 
 * 4、生成子代理的代理关系
 */
promise.then(data => {
    // console.log(data._id);
    // 添加个代理
    userModel.create({username: random.cname(), password: '7259650e64b768a00c805891b429741d', depth: data.depth + 1 , percentage: 80, is_proxy: 1},function(err,u) {
        for(let i = 1; i <= data.depth; i++) {
            proxy.path('p_' + i , objectId);
        }
        let p = {uid: u.id};

        proxyModel.find({uid: data._id}, function (d) {
            if(d) {
                Reflect.deleteProperty(data, '_id');
                Object.assign(d,p);
            }
            
            p['p_' + data.depth] = data._id;
            proxyModel.create(p, function(err, px) {
                console.log(px);
            })
        })
    })
    /* let i = 1;
    // 
    proxyModel.create({uid: data._id, p_1: data._id}, function (err, px) {
        console.log(err, px);
    }) */
})

