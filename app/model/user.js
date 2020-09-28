module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true }, //  设置主键  自增长 
    name: STRING(20),
    pwd: STRING(50),
  })

  return User;
}