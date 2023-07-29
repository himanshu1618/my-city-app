'use strict';
/* eslint-disable promise/no-callback-in-promise */

const expect = require('chai').expect;
const mock = require('sails-mock-models');

const error = new Error('You did something really bad');

describe('#myCityService', () => {

  describe('#getMyCities', () => {
    it('Should throw an error when something goes wrong', (done) => {
      mock.mockModel(MyCity, 'find', null, error);

      myCityService.getMyCities({}, 1, 0)
        .catch((err) => {
          expect(err).to.be.a('object');
          expect(err instanceof Error).to.equal(true);
          expect(err.data).to.be.a('object');

          MyCity.find.restore();
          done();
        });
    });
  });

  describe('#getMyCitiesPaginated', () => {
    it('Should throw an error when something goes wrong', (done) => {
      mock.mockModel(MyCity, 'find', null, error);

      myCityService.getMyCitiesPaginated({}, 1, 0, '')
        .catch((err) => {
          expect(err).to.be.a('object');
          expect(err instanceof Error).to.equal(true);
          expect(err.data).to.be.a('object');

          MyCity.find.restore();
          done();
        });
    });
  });

});
