'use strict';
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

const expect = require('chai').expect;

describe('#jwtService', () => {

  describe('#verifyToken', () => {

    it('Should be able to verify token', (done) => {
      const token = sails.config.jwtHeader.split(' ')[1];
      jwtService.verifyToken(token)
        .then((user) => {
          expect(user).to.be.a('object');

          done();
        });
    });

    it('Should throw an error when something goes wrong', (done) => {
      jwtService.verifyToken('test')
        .catch((err) => {
          expect(err instanceof Error).to.equal(true);

          done();
        });
    });

  });

});
