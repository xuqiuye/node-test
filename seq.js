const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // 不设计 createdAt
  define: {
      timestamps: true,
      
  }

  // SQLite only
  //storage: 'path/to/database.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // 定义表结构
  const User = sequelize.define('user', {
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING}
  },{
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  });

 /*  User.sync({force: true}).then(() => {
    // Table created
    return User.insertOrUpdate({
      firstName: 'John',
      lastName: 'Hancock'
    });
  }); */
async function a () {
  await User.findOne({where: {id: 1}});
  User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  });
  return b();
}
async function  b () {
  await User.findOne({where: {id: 1}});
  return User.findOne({where: {id: 1}});
}
  return sequelize.transaction(function (t) {

    // chain all your queries here. make sure you return them.
    return a();
  }).then(function (result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
  }).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
  });
/*   User.findAll().then(result => {
      console.log(result);
  }) */

