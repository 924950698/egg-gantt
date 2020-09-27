'use strict';

const Service = require('egg').Service;

class userService extends Service {

  async lists() {
    try { 
      const { app } = this;
      const res = app.mysql.select('user');
      return res;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  async find(id) {
    try {
      const { app } = this;
      const res = app.mysql.query('select * from user where id = ?', id);
      return res;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  async insert(user) {
    try {
      const { app } = this;
      const res = app.mysql.insert('user', user);
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
      const res = app.mysql.update('user', rows);
      console.log("数据库链接成功==>", res);
      return res;
    } catch(error) {
      console.log("数据库链接失败==>", error);
      return null;
    }
  }
  
}

module.exports = userService;
