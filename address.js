const mongoose = require('mongoose');
const mock = require('mockjs');
const random = mock.Random;

const schema = mongoose.Schema,
    objectId = mongoose.ObjectId;

const conn = mongoose.connect('mongodb://127.0.0.1/local');

const addressSchema = new schema({
    building: {type: String},
    pincode: {type: Number},
    city: {type: String},
    state: {type: String}
});

const userSchema = new schema({
    concact: {type: String},
    birthday: {type: Date, default: Date.now()},
    name: {type: String},
    address: {type: Array}
});

const addressModel = mongoose.model('address', addressSchema, 'address');
const userModel = mongoose.model('user', userSchema, 'user');

let address = {};
address.building = random.cname();
address.pincode = random.integer();
address.city = random.name();
address.state = random.name();

let user = {};
user.concact = random.cname();
// user.birthday
user.name = random.name();
user.address = address;
// 中间件
userSchema.pre('save', function (next) {
    console.log('is save method');
    next();
});
userModel.create(user, function (err) {
    console.log(err);
})

/* addressModel.create(address, function (err) {
    console.log(err);
}) */