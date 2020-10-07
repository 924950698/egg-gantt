module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Gannt = app.model.define('gannt', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true }, //  设置主键  自增长 
    label: STRING(20),
    user: STRING(20),
    start: INTEGER(20),
    endDate: STRING(20),
    duration: INTEGER(50),
    percent: INTEGER(10),
    type: STRING(20),
    proType: STRING(20),
    risk: STRING(10),
    parentId: INTEGER(),
    childId: STRING(45),
  })

  // label查询
  Gannt.findByLabel = async function(label) {
    return await this.findAll ({
      where: {
        label: label
      }
    });
  }

  // id查询
  Gannt.findById = async function(id) {
    return await this.findAll ({
      where: {
        id: id
      }
    });
  }

  return Gannt;
}