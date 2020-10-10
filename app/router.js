'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jsonp } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
  router.get('/user/lists',controller.user.lists);
  router.get('/user/find', controller.user.find);
  router.get('/user/insert', controller.user.insert);
  router.get('/user/update', controller.user.update);
  router.get('/user/delete', controller.user.delete);
  router.get('/demo', controller.home.demo);

  router.get('/gannt/lists', controller.gannt.lists);
  router.post('/gannt/created', controller.gannt.created);
  router.post('/gannt/update', controller.gannt.update);
  router.post('/gannt/destroy', controller.gannt.destroy);
};