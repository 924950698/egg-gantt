'use strict';

const Controller = require('egg').Controller;
const info = require('../utils/info');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.info);
    ctx.body = 'hi, egg 123';
  }

  async demo() {
    const { ctx } = this;
    console.log(ctx.info);
    ctx.body = 'demo';
  } 
}

module.exports = HomeController;
