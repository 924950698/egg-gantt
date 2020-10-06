'use strict';

const Controller = require('../core/base_controller');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class GanntController extends Controller {

  // 获取列表
  // async lists() {
  //   const { ctx } = this;
  //   const res = await ctx.model.Gannt.findAll();
  //   if(res) {
  //     this.success(res);
  //   } else {
  //     this.notFound('lists接口地址错误');
  //   }
  // }

  // 列表 和 查询
  async lists() {
    const { ctx } = this;
    let { currentPage = 1, currentSizes = 10, filters } = ctx.request.query
    console.log(currentPage, currentSizes);
    let offset = (currentPage - 1) * currentSizes;
    var userList;
    if(filters) {
      userList = await this.ctx.model.Gannt.findAndCountAll({
          offset,//offet去掉前多少个数据
          limit: Number(currentSizes),//limit每页数据数量
          where: {
            label: filters
          },
      })
    } else {
      userList = await this.ctx.model.Gannt.findAndCountAll({
        offset,//offet去掉前多少个数据
        limit: Number(currentSizes),//limit每页数据数量
      })
    }
    ctx.body = {
      data: userList.rows,
      total: userList.count,
    };
  }

  //查询
  async search() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.model.Gannt.findByLabel(params.label);
    if(res) {
      this.success(res);
    } else {
      this.notFound('search接口地址错误');
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