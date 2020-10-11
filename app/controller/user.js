'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const dayjs = require('dayjs');

class UserController extends Controller {

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

    console.log("user==>", user);
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
      crreateTime: dayjs().format('YYYY-MM-DD HH:ss:ss')
    });

    if(result) {
      ctx.body = {
        status: 200,
        data: result,
      }
    }else {
      ctx.body = {
        status: 500,
        errMsg: '注册使用失败'
      }
    }

  };

  

}

module.exports = UserController;

