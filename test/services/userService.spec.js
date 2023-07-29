'use strict';
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

const expect = require('chai').expect;

describe('#userService', () => {

  describe('#getUserByUsername', () => {

    it('Should get user object by username', (done) => {
      userService.getUserByUsername('test')
        .then((user) => {
          expect(user).to.be.a('object');
          expect(user.username).to.be.a('string');

          done();
        });
    });

    it('Should throw an error when something goes wrong', (done) => {
      userService.getUserByUsername('xxxx')
        .catch((err) => {
          expect(err instanceof Error).to.equal(true);

          done();
        });
    });

  });

});
