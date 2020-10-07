'use strict';

const Controller = require('../core/base_controller');
const { Op } = require("sequelize");


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
    var countArr;
    if(filters) {
      countArr = await ctx.model.Gannt.findAndCountAll({
        offset,//offet去掉前多少个数据
        limit: Number(currentSizes),//limit每页数据数量
        where: {
          label: filters,
          // parentId: null,
        },
      });
      
      const len = countArr.rows;
      for( let i = 0; i < len.length; i ++) { // 过滤结果是数组
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
        console.log("userList==>", JSON.stringify(userList));
        countArr.rows = userList.rows;
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
              [Op.startsWith]: len[i].id + '_',
            } 
          },
        })
        countArr.rows = countArr.rows.concat(userList.rows);
        countArr.count = userList.count + countArr.count
      }
    }
    ctx.body = {
      data: countArr.rows,
      total: countArr.count,
    };
  }

  //过滤
  async search() {
    // const { ctx } = this;
    // const params = ctx.request.body;
    // const res = await ctx.model.Gannt.findByLabel(params.label);
    // if(res) {
    //   this.success(res);
    // } else {
    //   this.notFound('search接口地址错误');
    // }
  }

   // 新建 - 处理childId
   async created() {
    const { ctx } = this;
    // parentId - id
    // 新建接口获取id，再调更新接口更新childId
    const params = ctx.request.body;
    const res = await ctx.model.Gannt.create(params);
    const parentId= params.parentId;
    const currentId= res.id;
    var childId = ''; 
    const parentVal = await ctx.model.Gannt.findById(parentId);
    const parentData = parentVal[0].dataValues;
    // console.log("parentData==>", parentData);
    if(parentData) {
      if(parentData.childId) {
        childId = parentData.childId + '_' + currentId;
      }else {
        childId = parentData.id + '_' + currentId;
      }
    } else {
      this.notFound('查找不到该条parentId记录！');
    }
    // console.log("childId==>", childId);
    params.childId = childId;
    // console.log("params==>", params);
    const body = await res.update(params);
    // console.log("body==>", body);
    if(body) {
      this.success(body);
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