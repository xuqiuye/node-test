const Sequelize = require('sequelize');

const sequelize = new Sequelize('amusement_platform', 'amusement', '.>46=(Co@964=2}A9o.X9?R7ygq^R9VQ',{
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

const baijialeUserBetHistoryTable = sequelize.define('baijiale_user_bet_histroy', {
    user_id: Sequelize.BIGINT, 
    sequence_id: Sequelize.BIGINT, // 批次号
    series_id: Sequelize.BIGINT, // 场次号
    round_id: Sequelize.BIGINT, // 回合号
    player_wager: Sequelize.BIGINT, // 闲 下注
    banker_wager: Sequelize.BIGINT, // 对庄 下注
    player_double_wager: Sequelize.BIGINT, // 对闲 下注
    banker_double_wager: Sequelize.BIGINT, // 对庄 下注
    he_wager: Sequelize.BIGINT, // 和 下注
    result: Sequelize.INTEGER, // 结果 0 和 1 虎 -1 龙
    profit_and_loss: Sequelize.BIGINT // 该回合盈亏
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

// 
baijialeUserBetHistoryTable.upsert({
    user_id: 6526990780,
    sequence_id: 128,
    series_id: 1,
    round_id: 7,
    player_wager: 300,
    banker_wager: 0,
    banker_double_wager: 0,
    player_double_wager: 0,
    he_wager: 0,
    result: '100',
    profit_and_loss: 600
}, {
    where: {
        user_id: 6526990780,
        sequence_id: 128,
        series_id: 1,
        round_id: 7
    }
}).then(result => {
    console.log(result);
})