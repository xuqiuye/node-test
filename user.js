const mongoose = require('mongoose');
const mock = require('mockjs');
const random = mock.Random;

// const mongodb = new mongoose();
const conn = mongoose.connect('mongodb://127.0.0.1/local');

// schema
const schema = mongoose.Schema,
    objectId = schema.ObjectId;

const userSchema = new schema({
    uuid: String,
    salt: String,
    username: {type: String},
    account: {type: String},
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
// console.log(objectId);
// 肯定是连接创建模型啦
const userModel = mongoose.model('user', userSchema, 'user');

/* userModel.create({username: random.cname(), password: '7259650e64b768a00c805891b429741d', depth: 1, percentage: 90, is_proxy: 1}, function (err,user){
    console.log(err);
}) */

let set = new Set();
userSchema.pre('save', function (next) {
    console.log('正在保存，请等待。。。。');
    next();
})
for (let i = 0; i < 10; i++) {
    set.add({uuid: random.word(), salt: 'LzyC',username: random.cname(), account: random.word(8,12), password: '7259650e64b768a00c805891b429741d', depth: random.integer(1,10), percentage: 90, is_proxy: 1})    
}

// 遍历转成数组
let users = [...set];
userModel.insertMany(users, function (err) {
    console.log(err)
})
/**
id	Integer					
username	VarChar(200)				代理名称	
password	VarChar(256)				密码	
depth	Integer			0	代理深度	
is_proxy	TinyInt			0	是否是代理(1-yes, 0-no)	
status	TinyInt				是否禁用	
percentage	Numeric(10, 1)				分成比例	
created_at	TimeStamp				创建时间	
created_by	Integer				创建人	
created_name	VarChar(200)				创建人名称（管理员创建为空）	
remark	Text				备注
*/
//7259650e64b768a00c805891b429741d