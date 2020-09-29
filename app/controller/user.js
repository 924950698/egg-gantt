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
    // const res = await ctx.service.user.lists();

    const res = await ctx.model.User.findAll();
    ctx.body=res;
  }

  async find() {
    const { ctx } = this;
    // const res = await ctx.service.user.find(1);
    const res = await ctx.model.User.findByPk(ctx.query.id); //查询指定数据
    ctx.body = res;
  }

  
  async insert() {
    const { ctx } = this;
    const user = {
      id: 5,
      name: 'user2',
      pwd: '123'
    }
    // const res = await ctx.service.user.insert(user);
    const res = await ctx.model.User.create(user);
    ctx.body = res;
  }

  async update() {
    const { ctx } = this;
    const params = {
      id: 7,
      name: "user2222",
      pwd: "222"
    }

    // const res = await ctx.service.user.update(user);

    const user = await ctx.model.User.findByPk(JSON.stringify(params.id));
    if (!user) {
      ctx.status = 404;
      return;
    }
    const res = await user.update(params);

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

