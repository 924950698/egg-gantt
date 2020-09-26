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

  // 添加 news 的配置项
  // config.news = {
  //   pageSize: 5,
  //   serverUrl: 'https://hacker-news.firebaseio.com/v0',
  // };

  // add middleware robot
  // config.middleware = [
  //   'robot'
  // ];

  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};


