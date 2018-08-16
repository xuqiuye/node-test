const Sequelize = require('sequelize');

const sequelize = new Sequelize('amusement_platform', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql', 
    define: {
        timestamps: true,
        charset: 'utf8',
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0
    }
})
const bet = longhuUserBetHistoryTable = sequelize.define('longhu_user_bet_histroy', {
    user_id: Sequelize.BIGINT, 
    sequence_id: Sequelize.BIGINT, // 批次号
    series_id: Sequelize.BIGINT, // 场次号
    round_id: Sequelize.BIGINT, // 回合号
    long_wager: Sequelize.BIGINT, // 龙 下注
    hu_wager: Sequelize.BIGINT, // 虎 下注
    he_wager: Sequelize.BIGINT, // 和 下注
    result: Sequelize.INTEGER, // 结果 0 和 1 虎 -1 龙
    profit_and_loss: Sequelize.BIGINT // 该回合盈亏
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Op = sequelize.op;
/* bet.findAll({
    group: 'day(`created_ad`)'
}).then(e => {
    console.log(e);
}) */
async function gets() {
    const query = await sequelize.query(
        'SELECT SUM(`profit_and_loss`) as profit_and_loss,YEAR(`created_at`) as year, month(`created_at`) as month,day(`created_at`) as day FROM longhu_user_bet_histroy WHERE created_at BETWEEN :start_time AND :end_time GROUP BY YEAR(`created_at`), month(`created_at`), DAY(`created_at`)',
        {replacements: {start_time: '2018-06-10', end_time: '2018-06-16'}, type: sequelize.QueryTypes.SELECT }
    )
    console.log(query);
    return query;
}

gets();




