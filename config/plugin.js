'use strict';

var path = require('path');

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = { 
  enable: true, 
  package: 'egg-cors' 
};

exports.jwt = {
  enable: true, 
  package: 'egg-jwt' 
};

exports.auth = {
  enable: true, 
  path: path.join(__dirname, '../lib/plugin/egg-auth')
}

exports.session = {
  key: 'SESSION_ID',
  maxAge: 24 * 3600 * 1000,
  httpOnly: true,
  renew: true,
  encrypt: true,
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
};

