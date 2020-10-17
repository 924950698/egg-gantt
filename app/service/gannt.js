'use strict';

const Service = require('egg').Service;
const BaseService = require('./base');

class ganntService extends BaseService {

  async lists() {
    this.run(() => {
      const { app } = this;
      const res = app.mysql.select('gannt');
      return res;
    })
  }

  async find(id) {
    this.run(() => {
      const { app } = this;
      const res = app.mysql.query('select * from gannt where id = ?', id);
      return res;
    })
  }

  async insert(user) {
    this.run(() => {
      const { app } = this;
      const res = app.mysql.insert('gannt', user);
      return res;
    })
  }


  async update(rows) {
    this.run(() => {
      const { app } = this;
      const res = app.mysql.update('gannt', rows);
      return res;
    })
  }

  async delete(id){
    this.run(() => {
      const { app } = this;
      const res = app.mysql.delete('gannt', id);
      return res;
    })
  }
  
}

module.exports = ganntService;
