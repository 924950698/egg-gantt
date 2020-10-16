module.exports = options => {
  return async (ctx, next) => {
    console.log("options==>", options);
    const url = ctx.request.url;
    // const user = ctx.username;
    const user = await ctx.app.redis.get(ctx.username);
    console.log("auth.js ==>", user);
    if(!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登录',
      }
    }else {
      await next();
    }
  }
}