'use strict';

const Controller = require('../core/base_controller');
const { Op } = require("sequelize");


function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class GanntController extends Controller {

  // 列表 和 查询
  async lists() {
    const { ctx } = this;
    let { currentPage = 1, currentSizes = 10, filters } = ctx.request.query
    let offset = (currentPage - 1) * currentSizes;
    var userList;
    var countArr;
    if(filters) {
      countArr = await ctx.model.Gannt.findAndCountAll({
        offset,//offet去掉前多少个数据
        limit: Number(currentSizes),//limit每页数据数量
        where: {
          label: filters,
        },
      });
      
      const len = countArr.rows;
      for( let i = 0; i < len.length; i ++) { // 过滤结果是数组
        if(i == 0) {
          countArr.rows = [];
        }
        var id;
        if(len[i].childId) {
          id = len[i].childId.split('_')[0];
        } else {
          id = len[i].id;
        }
        userList = await ctx.model.Gannt.findAndCountAll({
          where: {
            [Op.or]: [
              {
                childId: {
                  [Op.startsWith]: id + '_',
                } 
              },
              {
                id: {
                  [Op.eq]: id, 
                }
              }
            ],
          },
        })
        countArr.rows = countArr.rows.concat(userList.rows);
        countArr.count = countArr.count;
      }
      
    } else {
      countArr = await ctx.model.Gannt.findAndCountAll({
        offset,//offet去掉前多少个数据
        limit: Number(currentSizes),//limit每页数据数量
        where: {
          parentId: null,
        }
      })
      const len = countArr.rows;
      for( let i = 0; i < len.length; i ++) {
        userList =  await ctx.model.Gannt.findAndCountAll({
          where: {
            childId: {
              [Op.regexp]: [`^${len[i].id}_`], // Op.startsWith 无法区分 1_ 与 12_； 使用Op.regexp替换即可
            } 
          },
        })
        countArr.rows = countArr.rows.concat(userList.rows);
        countArr.count = userList.count + countArr.count;
      }
    }
    ctx.body = {
      data: countArr.rows,
      total: countArr.count,
    };
  }

  // 新建
  async created() {
    const { ctx } = this;
    // parentId - id
    // 新建接口获取id，再调更新接口更新childId
    const params = ctx.request.body;
    const res = await ctx.model.Gannt.create(params); // 新建需求
    const parentId= params.parentId;
    if(parentId) {                                    // 新建子节点
      const currentId= res.id;
      var childId = ''; 
      const parentVal = await ctx.model.Gannt.findById(parentId);
      const parentData = parentVal[0].dataValues;
      if(parentData) {
        if(parentData.childId) {
          childId = parentData.childId + '_' + currentId;
        }else {
          childId = parentData.id + '_' + currentId;
        }
      } else {
        this.notFound('查找不到该条parentId记录！');
      }
      params.childId = childId;
      const body = await res.update(params);
      if(body) {
        this.success(body);
      } else {
        this.notFound('created接口地址错误');
      }
    } else {
      if(res) {
        this.success(res);
      } else {
        this.notFound('created接口地址错误');
      }
    }
  }

  // 更新
  async update() {
    const { ctx } = this;
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