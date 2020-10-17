module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const currentToken = ctx.request.getToken; // 当前请求的中携带的token
    const redisToken = await ctx.app.redis.get(ctx.username); // redis缓存中的token
    const isUser =  redisToken ? redisToken === currentToken : redisToken;
    if(!isUser && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登录',
      }
    }else {
      await next();
    }
  }
}