const Sequelize = require('sequelize');
const mock = require('mockjs');
const random = mock.Random;
const R = require('ramda');
const moment = require('moment');


// 使用 sequelize连接数据库, 返回一个sequelize实例
const sequelize = new Sequelize('test', 'root', '123456',{
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
const Op = sequelize.Op;

// sequelize.Op
// 用户表
const User = sequelize.define('platform_user', {
    user_id: Sequelize.BIGINT,
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    pic: {
        type:Sequelize.STRING,
        defaultValue: 0
    },
    is_blocking: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    }, // 账户是否被锁定
    account_balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, // 账户余额 （分为单位）,
    bank_balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }, // 账户银余额 （分为单位）
    createdAt: {
        type: Sequelize.DATE,
        get() {
            const createAt = this.getDataValue('createAt')
            // createAt is an instance of date, you could operate it with moment library
            // to get ur format
            return createAt
        },
        set(createAt) {
            return this.setDataValue('createAt',createAt)
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            console.log('wo lai zhe li!');
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
/*     createdAt: 'created_at',
    updatedAt: 'updated_at', */
    indexes: [{
        unique: true,
        fields: ['phone']
    }, {
        unique: true,
        fields: ['user_id']
    }]
});
// 代理表
const Proxy = sequelize.define('proxy', {
    user_id: Sequelize.BIGINT,
    child_ids: {
        type: Sequelize.JSON,
        defaultValue: {}
    },
    parent_ids: {
        type: Sequelize.JSON,
        defaultValue: {}
    },
    is_proxy: { 
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ['user_id']
    }]
});

async function find(t) {
    let user = await User.findOne({
        where: {user_id: 18114194}
    }, {transaction: t});
    return await add_proxy(user.dataValues);
}
// User.sync({ force: true })

/* User.create({
    user_id: random.integer(10000000, 99999999),
    password: 123456,
    phone: '186' + random.integer(10000000, 99999999),
    name: random.name()
}); */

async function add_proxy(user)
{
    let user_id = random.integer(10000000, 99999999);
    const is_add = await User.create({
        user_id: user_id,
        password: 123456,
        phone: '186' + random.integer(10000000, 99999999),
        name: random.name()
    });
    if(R.isEmpty(is_add)) {
        throw new Error('创建推广者/代理者失败！');
    }
    const proxy = await Proxy.findOrCreate({
        where: {
            user_id: user.user_id
        }
    });
    const p = proxy[0].dataValues;
    const children = p.child_ids;
    const parent = p.parent_ids;
    let clen = Object.values(children).length;
    let plen = Object.values(parent).length;
    children[clen] = user_id;
    parent[plen] = user.user_id;
    Proxy.update({
        child_ids: children
    }, {
        where: {
            user_id: user.user_id
        }
    })

    return Proxy.insertOrUpdate({
        user_id: user_id,
        child_ids: {},
        parent_ids: parent
    });
}
/* return sequelize.transaction(t => {
    // return find(t);
}).then (result => {

}).catch(err => {

}) */
/* User.find({
    where: {user_id: 18114194}
}).then(data => {
    console.log(data);
}) */
let arr = [43229688];
// let arr = [30631124,19193430,59347295,29208942,33696007,89655124,85905140];
let a = {
    [Op.in]: arr
}
/* let users =  (async function () {
    User.findAll({
        where: {
            user_id: a
        }
    }).then(b => {
        console.log(b.get())
    })
    // console.log(b.get());
}()) */
// console.log(users);
// console.log(moment('2018-06-28T06:46:05.000Z').format('YYYY-MM-DD HH:mm:ss'));
// console.log(users)


const Address = sequelize.define('address', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    createdAt: {
        type: Sequelize.DATE, 
        field: 'created_at',
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE, 
        field: 'updated_at',
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    deleteAt: {type: Sequelize.DATE, field: 'deleted_at'}
  }, {
    timestamps: true
  })
async function test() {
    
    let b = await Address.findAll({where: {id:1}});
    console.log(b);
    return b;
}
test();

/*   return sequelize.sync({
    force: true,
    logging: console.log
  })
    .then(user => {
      return Address.create()
    }).then(address => console.log(address.get()))
    .finally(() => sequelize.close()); */
