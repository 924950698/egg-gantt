'user strict';

const Controller = require('egg').Controller;
const info = require('../utils/info');

class UserController extends Controller {
  async index () {
    const { ctx } = this;
    console.log(ctx.info);
    ctx.body = 'user index';
  }

  async lists() {
    const { ctx } = this;
    await new Promise(reslove => {
      setTimeout(()=> {
        reslove();
      }, 1500);
    })
    ctx.body=[{id: '1234'}];
  }
}

module.exports = UserController;

