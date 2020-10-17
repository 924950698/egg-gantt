// 操作数据库相关逻辑

'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const BaseService = require('./base');

class userService extends BaseService {

  async getUser(username, password) {
    return this.run(async () => {
      const { ctx } = this;
      const _where = password ? { username, password: md5(password + this.app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where
      });
      return result;
    });
  }

  async add(params){
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }
}

module.exports = userService;
