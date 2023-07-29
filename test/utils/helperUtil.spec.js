'use strict';

const expect = require('chai').expect;

const helperUtil = require('../../api/utils/helperUtil');

describe('#helperUtil', () => {

  describe('#getUserIP', () => {
    it('Should get user ip', (done) => {
      const ip = helperUtil.getUserIP({ headers: { X_FORWARDED_FOR: '192.168.1.1' } });
      expect(ip).to.be.a('string');
      done();
    });
  });

  describe('#getCurrentTime', () => {
    it('Should get current time', (done) => {
      const time = helperUtil.getCurrentTime();
      expect(time).to.be.a('number');
      done();
    });
  });

  describe('#getResponseTime', () => {
    it('Should get time difference', (done) => {
      const time = helperUtil.getResponseTime(new Date(), new Date());
      expect(time).to.be.a('number');
      done();
    });
  });

});
