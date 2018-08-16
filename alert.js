'use strict'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root','123456', {
    host: '127.0.0.1',
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

// 创建 sequelize 实例
// const sequelize = new Sequelize('db1', 'root', '111111', {logging: console.log});

// 定义User模型
var User = sequelize.define('user', {
	id:{type: Sequelize.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
	name: { type: Sequelize.STRING, comment:'姓名' },
    sex: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0, comment:'性别' },
    is_assign: {type: Sequelize.BOOLEAN, defaultValue: 0},
	companyId: { type: Sequelize.BIGINT(11), field: 'company_id', allowNull: false, comment:'所属公司' },
	isManager: { type: Sequelize.BOOLEAN, field: 'is_manager', allowNull: false, defaultValue: false, comment:'是否管理员'}
}, 
{ charset: 'utf8',
    collate: 'utf8_general_ci'
});

User.sync({
    alter: true
})