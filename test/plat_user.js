const Sequelize = require('sequelize');
const mock = require('mockjs');
const random = mock.Random;
const R = require('ramda');
const moment = require('moment');

// 使用 sequelize连接数据库, 返回一个sequelize实例
const sequelize = new Sequelize('amusement_platform', 'root', '123456',{
    host: '127.0.0.1',
    dialect: 'mysql',
    // 连接项
    define: {
        timestamps: true,
        freezeTableName: true,
        charset: 'utf8mb4',
        dialectOptions: {
            collate: 'utf8mb4_unicode_ci'
        },
        underscored: false
    },
    timezone: '+08:00',
    // 连接池
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    }
});

const platformUserTable = sequelize.define('platform_user', {
    user_id: Sequelize.BIGINT,
    parent_id: {type: Sequelize.BIGINT,defaultValue: 0},
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    pic: Sequelize.STRING,
    is_proxy: {type: Sequelize.BOOLEAN, defaultValue: 0}, 
    accounting: {type: Sequelize.DECIMAL, defaultValue: 0},
    is_blocking: Sequelize.BOOLEAN, // 账户是否被锁定
    account_balance: {type: Sequelize.INTEGER, defaultValue: 0}, // 账户余额 （分为单位）,
    assign_account: {type: Sequelize.INTEGER, defaultValue: 0}, 
    bank_balance: {type: Sequelize.INTEGER, defaultValue: 0}, // 账户银余额 （分为单位）
    version:{type: Sequelize.BIGINT, defaultValue: 0} //版本号
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{
        unique: true,
        fields: ['phone']
    }, {
        unique: true,
        fields: ['user_id']
    }]
});

(async () => {
    const result = await platformUserTable.findAll({
        order: [
            [Sequelize.literal('account_balance + IFNULL(bank_balance, 0)'), 'DESC'],
        ]
    });
    const ret = [];

    let rankSort = 0;
    for (const elem of result) {
        ret.push({
            user_id: elem.user_id,
            phone: elem.phone,
            name: elem.name,
            pic: elem.pic,
            account_balance: elem.account_balance,
            bank_balance: elem.bank_balance,
            rank_sort: rankSort++
        });
    }

    console.log(ret);
})();