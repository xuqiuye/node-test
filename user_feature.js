const Sequelize = require('sequelize');
const Mock = require('mockjs');
const random = Mock.Random;
// connection
const sequelize = new Sequelize('proxy', 'amusement', '.>46=(Co@964=2}A9o.X9?R7ygq^R9VQ', {
    host: '192.168.0.115',
    dialect: 'mysql',
    define: {
        timestamps: true,
        charset: 'utf8',
        freezeTableName: true
    },
    timezone: '+8:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const user_feature = sequelize.define('user_feature', {
    user_id: Sequelize.BIGINT,
    is_register: Sequelize.BOOLEAN,
    is_apply: Sequelize.BOOLEAN,
    register_max: Sequelize.INTEGER,
    has_register: Sequelize.INTEGER,
    has_apply: Sequelize.INTEGER,
    apply_amount: Sequelize.DECIMAL(10, 2),
    register_amount: Sequelize.DECIMAL(10, 2)
}, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true,
                fields: ['user_id']
            }
        ]
    }
)
//user_feature.sync({ force: true });
// create
user_feature.create({
    user_id: random.integer(11111111, 99999999),
    is_register: random.boolean(),
    is_apply: random.boolean(),
    register_max: random.integer(0, 100),
    register_amount: random.increment(100, 999),
    apply_amount: random.increment(2)
}).then(e => {
    console.log(e);
})