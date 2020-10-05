'use strict';

const Controller = require('../core/base_controller');

class GanntController extends Controller {
  
  // 获取列表
  async lists() {
    const { ctx } = this;
    const res = await ctx.model.Gannt.findAll();
    if(res) {
      this.success(res);
    } else {
      this.notFound('lists接口地址错误');
    }
  }

   // 新建
   async created() {
    const { ctx } = this;
    const res = await ctx.model.Gannt.create(ctx.request.body);
    if(res) {
      this.success(res);
    } else {
      this.notFound('created接口地址错误');
    }
  }

  // 更新
  async update() {
    const { ctx } = this;
    console.log(ctx.request.body);
    const params = ctx.request.body;
    const user = await ctx.model.Gannt.findByPk(params.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    const res = await user.update(params);
    if(res) {
      this.success(res);
    } else {
      this.notFound('update接口地址错误');
    }
  }

  // 删除某一项
  async destroy() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
    const user = await ctx.model.Gannt.findByPk(params.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    const res = await user.destroy();
    if(res) {
      this.success(res);
    } else {
      this.notFound('delete接口地址错误');
    }
  }
  
}

module.exports = GanntController;