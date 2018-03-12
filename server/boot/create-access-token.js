'use strict';
const Promise = require('bluebird');

module.exports = function(app, cb) {
  const AccessToken = app.models.AccessToken;
  const User = app.models.User;

  const email = 'admin@mail.com';
  const password = 'password';
  const accessToken = 'password';

  return Promise.resolve()
    .then(() => User.findOne({ where: { email }}))
    .then(res => ( res ? res : User.create({ email, password })))
    .then(user => AccessToken.upsert({ id: accessToken, userId: user.id }))
    .then(token => console.log('Access token: ', token.id))
    // Works similarly to the 'finally' in Java, the callback method is executed
    // whatever the resulting status of the promise
    // and is passed:
    // - [1st arg]: error, which can be null
    // - [2nd arg]: result,
    .asCallback(cb);
};
