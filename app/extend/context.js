// 上下文

const os = require('os');

module.exports = {

  get info(){
    return data = {
      memory: os.totalmem() / 1024 / 1024 / 1024 + 'G',
      type: os.type(),
      cpus: os.cpus().length,
      platform: os.platform(),
      url: this.request.url,
    };
  },

  get username() {
    const token = this.request.header.token;
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined; //verify方法验证token
    console.log("tokenCache==>", tokenCache);
    return tokenCache ? tokenCache.username : undefined;
  },

}