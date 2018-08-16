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
	companyId: { type: Sequelize.BIGINT(11), field: 'company_id', allowNull: false, comment:'所属公司' },
	isManager: { type: Sequelize.BOOLEAN, field: 'is_manager', allowNull: false, defaultValue: false, comment:'是否管理员'}
}, 
{ charset: 'utf8',
	collate: 'utf8_general_ci'});

// 定义Company模型
var Company = sequelize.define('company', {
	id:{ type:Sequelize.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
	name: { type: Sequelize.STRING, comment:'公司名称' }
}, 
{ charset: 'utf8',
	collate: 'utf8_general_ci'});

// Company.sync();
// User.sync();

// 定义User-Company关联关系
User.belongsTo(Company, {foreignKey:'companyId'});

// sequelize.sync({force:true}).then(() => {
// 	process.exit();
// });

/* Company.create({name:'某公司'}).then((result) => {
	return Promise.all([
		User.create({name:'何民三', sex:1, companyId:result.id, isManager: true}),
		User.create({name:'张老二', sex:1, companyId:result.id})
	])
}).then((result) => {
	console.log('done');
}).catch((err) => {
	console.error(err);
}); */

var include = [{
	model: Company,
	as: 'company'
}];
User.findAll({include:include}).then((result) => {
    // console.log(result);
    for(let e of result) {
	    console.log(e.name + ' 是 '+e.company.name+' 的员工');
    }
}).catch((err) => {
	console.error(err);
});

var include = [{
	association: Company.hasMany(User, {foreignKey:'companyId', as:'manager',sourceKey: 'id'}),
	where: {isManager:true}
}]

Company.findOne({include:include}).then((result) => {
	console.log(result.manager);
}).catch((err) => {
	console.error(err);
});