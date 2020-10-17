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
    // console.log("tokenCache==>", tokenCache);
    return tokenCache ? tokenCache.username : undefined;
  },

  /**
   *  Tips: 
   *  GET的请求参数通过this.query获取；
   *  POST的请求参数通过this.requset.body获取  
  */

  params(key) {
    const method = this.request.method;
    if(method === 'GET') {
      return key ? this.query[key] : this.query; 
    } else {
      return key ? this.request.body[key] : this.request.body;
    }
  },

}