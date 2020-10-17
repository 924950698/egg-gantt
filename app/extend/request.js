module.exports = {
  get getToken() {
    return this.get('token'); // 获取header中的token
  }
}