'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.get('/', controller.home.index);
  // user
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/logout',controller.user.logout);
  // gannt
  router.get('/demo', controller.home.demo);
  router.get('/gannt/lists', userExist, controller.gannt.lists);
  router.post('/gannt/created', controller.gannt.created);
  router.post('/gannt/update', controller.gannt.update);
  router.post('/gannt/destroy', controller.gannt.destroy);
};