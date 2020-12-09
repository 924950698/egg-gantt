/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601000233539_3831';

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // add your user config here
  config.userConfig = {
    salt: 'muke',
  }

  config.jwt = {
    secret: 'muke',
  }
  
  config.auth = {
    exclude: ['/api/user/login', '/api/user/register', '/api/user/logout']
  }

  // config.allowHost = ['47.108.160.159:7001'];

  config.mysql = {
    client: {
      host: '47.108.160.159',
      port: '3306',
      user: 'root',
      password: 'abc123456',
      database: 'egg',
    },
    app: true,   // 是否挂载在全局下
    agent: false,// 是否挂载到代理下
  }

  config.sequelize = {
    dialect: 'mysql', // 数据源
    host: '47.108.160.159',
    port: '3306',
    root: 'root',
    password: 'abc123456',
    database: 'egg', 
    define: {
      timestamps: false,  // 是否自动添加时间戳createAt，updateAt
      freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    }
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };
  
  // 配置 跨域
  config.cors = {
    credentials: true, // 支持cookie跨域
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.redis = {
    client: {
      port: 6379,
      host: '47.108.160.159',
      password: 'abc123456',
      db: 0, // 数据库选择 1 - 15
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};


