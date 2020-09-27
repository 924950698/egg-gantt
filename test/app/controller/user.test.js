'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('user test', () => {
  it('should assert', () => {
    return app.httpRequest()
      .get('/user')
      .expect(200)
      .expect('user index');
  });
})