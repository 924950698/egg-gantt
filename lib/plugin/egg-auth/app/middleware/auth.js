module.exports = options => {
  console.log("options==>", options);
  return async (ctx, next) => {
    const url = ctx.request.url;
    const user = ctx.session.user;
    if(!user && !options.exclude.includes(ctx.request.url.split('?'))) {
      ctx.body = {
        status: 1001,
        errMsg: '用户登录'
      }
    }else {
      await next();
    }
  }
}