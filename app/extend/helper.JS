const dayjs = require('dayjs');

module.exports = {

  time(format) {
    return dayjs().format(format);
  },

  timeStamp(data) {
    return new Date(data).getTime();
  },

  upPick(source, arr) {
    if(Array.isArray(arr)) {
      let obj = {};
      for(let i in source) {
        if(!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },

}