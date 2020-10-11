// 操作数据库相关逻辑

'use strict';

const Service = require('egg').Service;

class userService extends Service {

  async getUser(username) {
    try {
      const { ctx } = this;
      const result = await ctx.model.User.findOne({
        where: {
          username
        }
      });
      console.log('查找当前用户==>', result)
      return result;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  async add(params){
    try {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    } catch(error){
      console.log(error);
      return null;
    }
  }
}

module.exports = userService;
