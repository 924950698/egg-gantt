// 判断用户是否登录中间件， 在多个接口的router上可以用，全局用则写在  config.middleware = []中
module.exports = options => {
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.username);
    if(!user) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在！'
      };
      return;
    }else {
      await next();
    }
  }
}