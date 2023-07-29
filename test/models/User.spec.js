'use strict';
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

const expect = require('chai').expect;

describe('#User', () => {

  describe('#getByIdOrUserName', () => {

    it('Should get user object by id or username', (done) => {
      User.getByIdOrUserName('test')
        .then((user) => {
          user = user.toJSON();
          expect(user).to.be.a('object');
          expect(user.username).to.be.a('string');

          done();
        });
    });

  });

});
