'use strict';

const Controller = require('egg').Controller;
const info = require('../utils/info');

class UserController extends Controller {

  async index () {
    const { ctx, app } = this;
    ctx.body = 'user index';
  }

  

}

module.exports = UserController;

