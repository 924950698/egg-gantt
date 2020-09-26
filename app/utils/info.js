const os = require('os');

module.exports = () => {
  const data = {
    memory: os.totalmem() / 1024 / 1024 / 1024 + 'G',
    type: os.type(),
    cpus: os.cpus().length,
    platform: os.platform(),
  }

  return data;
}