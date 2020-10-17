'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const helper = require('../extend/helper');
const BaseController = require('./base'); 

class UserController extends BaseController {

  async jwtSign(username) {
    const { app } = this;
     const token = app.jwt.sign({ username }, app.config.jwt.secret);
     await app.redis.set(username, token, 'EX', 24 * 3600);
     return token;
  }

  // 返回值公共函数
  parseResult(result) {
    return {
      ...helper.upPick(result.dataValues, ['password']), //返回值不包含密码字段
      createTime: helper.timeStamp(result.createTime),
    }
  }

  async register() {
    const { ctx } = this;
    const params = ctx.request.body;
    if(!params.username) {
      return this.error('username不能是空');
    }  
    const user = await ctx.service.user.getUser(params.username);
    if(user) {
      return this.error('该用户已存在');
    }

    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + this.app.config.salt),
      createTime: helper.time('YYYY-MM-DD HH:mm:ss'),
    });
    if(result) {
      const token = await this.jwtSign(params.username);
      this.success({ ...this.parseResult(result), token });
    } else {
     this.error('注册失败，请检查注册信息');
    }
  };

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params();
    const result = await ctx.service.user.getUser(username, password);
    if(result) {
      const token = await this.jwtSign(username);
      this.success({ ...this.parseResult(result), token });
    } else {
      this.error('登录失败，请检查登录信息')
    }
  };

  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null;
      this.success('ok');
    } catch(error) {
      this.error('退出登录失败！')
    }
  }



  


  

}

module.exports = UserController;

