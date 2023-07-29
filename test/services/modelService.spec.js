'use strict';
/* eslint-disable promise/no-callback-in-promise */

const expect = require('chai').expect;

describe('#modelService', () => {

  describe('#sanitizeFindParameter', () => {
    it('should provide sort parameter as array', (done) => {
      const val = modelService.sanitizeFindParameter({ sort: [{ price: 'ASC' }, { color: 'DESC' }] });

      expect(val).to.be.a('object');
      expect(val.sort).to.be.a('array');

      done();
    });

    it('should provide select parameter as array', (done) => {
      const val = modelService.sanitizeFindParameter({ select: ['price', 'color'] });

      expect(val).to.be.a('object');
      expect(val.select).to.be.a('array');

      done();
    });
  });

});
