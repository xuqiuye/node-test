'use strict'

const Sequelize = require('sequelize');
/**
 * "host": "192.168.0.115",
        "port": 3306,
        "user": "amusement",
        "password": ".>46=(Co@964=2}A9o.X9?R7ygq^R9VQ",
        "database": "amusement_platform"
 */
const sequelize = new Sequelize('amusement_platform', 'amusement','.>46=(Co@964=2}A9o.X9?R7ygq^R9VQ', {
    host: '192.168.0.115',
    dialect:'mysql',
    define: {
        charset: 'utf8mb4',
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    },
    logging: console.log
})

const platformUserTable = sequelize.define('platform_user', {
    user_id: Sequelize.BIGINT,
    parent_id: {type: Sequelize.BIGINT,defaultValue: 0},
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    pic: Sequelize.STRING,
    is_proxy: {type: Sequelize.BOOLEAN, defaultValue: 0}, 
    is_login: {type:Sequelize.BOOLEAN, defaultValue:1}, //
    accounting: {type: Sequelize.DECIMAL, defaultValue: 0},
    is_blocking: Sequelize.BOOLEAN, // 账户是否被锁定
    account_balance: Sequelize.INTEGER, // 账户余额 （分为单位）,
    bank_balance: Sequelize.INTEGER // 账户银余额 （分为单位）
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

const proxyAssignTable = sequelize.define('proxy_assign', {
    user_id: { type: Sequelize.BIGINT },
    assign_id: { type: Sequelize.BIGINT },
    amount: { type: Sequelize.DECIMAL(10,2), defaultValue: 0 },
    is_assign:  { type: Sequelize.BOOLEAN, defaultValue: 0 }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            fields: ['user_id'],
            unique: false
        }
    ],
    freezeTableName: true
})

var u_includes = [{
        //association: proxyAssignTable.belongsTo(platformUserTable, {foreignKey:'user_id', as:'users',targetKey: 'assign_id'}),
    association: platformUserTable.hasMany(proxyAssignTable,{as: 'proxy', foreignKey: 'assign_id', sourceKey: 'user_id'}),
    required: false,
    // attributes: 'amount'
}];

/* var p_include = [{
    association: proxyAssignTable.hasOne(platformUserTable, {as: 'user',sourceKey: 'user_id',foreignKey: 'user_id', targetKey: 'user_id'}),
    required: false
}] */

var p_include = {
    association: proxyAssignTable.belongsTo(platformUserTable, {foreignKey: 'assign_id', as: 'user',targetKey: 'user_id'}),
    where: {parent_id: 0, is_proxy: 1}
}
/* proxyAssignTable.findAll({
    include: includes
}).then(result => {
    console.log(result)
}) */

/* platformUserTable.findAll({
    include: u_includes,
    where: {
        parent_id: 0,
        is_proxy: 1
    }
}).then(result => {
    for(let r of result) {
        // console.log(r.proxy)
    }
}) */
const Op = Sequelize.Op;
proxyAssignTable.findAll({
    include: p_include,
    where: {
        created_at: {
            [Op.between]: ['2018-07-04', '2018-07-06']
        }
    }
}).then(result => {
    for(let u of result) {
        // console.log(u.user)
    }
})


proxyAssignTable.sum('amount', {
    where: {
        user_id: 7081875556
    }
}).then(e=> {
    console.log(e)
}) 
