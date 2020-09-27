'use strict';

const Controller = require('egg').Controller;
const info = require('../utils/info');

class UserController extends Controller {
  async index () {
    const { ctx, app } = this;
    ctx.body = 'user index';
  }

  async lists() {
    const { ctx } = this;
    const res = await ctx.service.user.lists();
    ctx.body=res;
  }

  async find() {
    const { ctx } = this;
    const res = await ctx.service.user.find(1);
    ctx.body=res;
  }

  async insert() {
    const { ctx } = this;
    const user = {
      id: 7,
      name: 'user2',
      pwd: '123'
    }
    const res = await ctx.service.user.insert(user);
    const insertSuccess = res.affectedRows === 1;
    if(res) {
      if(insertSuccess) {
        ctx.body = res;
        console.log('新建成功！');
      }
    } else {
      console.log('插入失败==>', res)
    }
  }

  async update() {
    const { ctx } = this;
    const user ={
      id: 4,
      name: 'user4'
    }
    const res = await ctx.service.user.update(user);
    ctx.body = res;
  }

  async delete() {
    const { ctx } = this;
    const user ={ name: 'user2' };
    const res = await ctx.service.user.delete(user);
    ctx.body = res;
  }

}

module.exports = UserController;

