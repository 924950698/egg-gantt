const Subscription = require('egg').Subscription;

class getInfo extends Subscription {
  // 通过schedule 属性设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: 3000, // 1 分钟间隔
      type: 'all',    // 指定所有等worker都需要执行
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const info = this.ctx.info;
    console.log( new Date(), info);  // 服务器端打印端是格林时间 t + 8
  }

}

module.exports = getInfo;