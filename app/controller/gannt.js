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

  // 删除某一项
  async delete() {
    const { ctx } = this;
    console.log("删除某一项==>", ctx);
    const res = await ctx.model.User.findByPk();
  }


  
}

module.exports = GanntController;