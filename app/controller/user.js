'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const helper = require('../extend/helper');

class UserController extends Controller {

  getToken(username) {
    const { app } = this;
    return app.jwt.sign({ username }, app.config.jwt.secret);
  }

  async register() {
    const { ctx } = this;
    const params = ctx.request.body;
    if(!params.username) {
      ctx.body = {
        statue: 500,
        errMsg: 'username不能是空',
      }
      return;
    }  
    const user = await ctx.service.user.getUser(params.username);
    if(user) {
      ctx.body = {
        statue: 500,
        errMsg: '该用户已存在',
      }
      return;
    }

    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + this.app.config.salt),
      createTime: helper.time('YYYY-MM-DD HH:mm:ss'),
    });
    if(result) {
      const token = await this.getToken(params.username);
      ctx.body = {
        status: 200,
        data: {
          ...helper.upPick(result.dataValues, ['password']),
          createTime: helper.timeStamp(result.createTime),
          token
        }
      }
    }else {
      ctx.body = {
        status: 500,
        errMsg: '注册使用失败'
      }
    }
  };

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const result = await ctx.service.user.getUser(username, password);
    if(result) {
      const token = await this.getToken(username);
      ctx.session[username] = result.id;
      console.log("session==>", JSON.stringify(ctx));
      ctx.body = {
        status: 200,
        data: {
          ...helper.upPick(result.dataValues, ['password']),
          createTime: helper.timeStamp(result.createTime),
          token
        }
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '登录使用失败'
      }
    }
  };

  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null;
      ctx.body = {
        status: 200,
        data: 'ok',
      }
    } catch(error) {
      ctx.body = {
        status: 500,
        errMsg: '退出登录失败！'
      }
    }
  }



  


  

}

module.exports = UserController;

