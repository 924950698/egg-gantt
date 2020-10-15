'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/logout',controller.user.logout);
  
  // router.get('/user/find', controller.user.find);
  // router.get('/user/insert', controller.user.insert);
  // router.get('/user/update', controller.user.update);
  // router.get('/user/delete', controller.user.delete);
  router.get('/demo', controller.home.demo);
  router.get('/gannt/lists', controller.gannt.lists);
  router.post('/gannt/created', controller.gannt.created);
  router.post('/gannt/update', controller.gannt.update);
  router.post('/gannt/destroy', controller.gannt.destroy);
};