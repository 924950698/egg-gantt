'use strict';

const Service = require('egg').Service;

class ganntService extends Service {

  async lists() {
    try { 
      const { app } = this;
      const res = app.mysql.select('gannt');
      return res;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  async find(id) {
    try {
      const { app } = this;
      const res = app.mysql.query('select * from gannt where id = ?', id);
      return res;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  async insert(user) {
    try {
      const { app } = this;
      const res = app.mysql.insert('gannt', user);
      console.log("数据库链接成功==>", res);
      return res;
    } catch(error) {
      console.log("数据库链接失败==>", error);
      return null;
    }
  }


  async update(rows) {
    try {
      const { app } = this;
      const res = app.mysql.update('gannt', rows);
      console.log("数据库链接成功==>", res);
      return res;
    } catch(error) {
      console.log("数据库链接失败==>", error);
      return null;
    }
  }

  async delete(id){
    try {
      const { app } = this;
      const res = app.mysql.delete('gannt', id);
      console.log("数据库链接成功==>", res);
      return res;
    } catch(error) {
      console.log("数据库链接失败==>", error);
      return null;
    }
  }
  
}

module.exports = ganntService;
