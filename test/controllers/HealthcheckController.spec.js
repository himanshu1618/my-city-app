'use strict';

const expect = require('chai').expect;
const request = require('supertest');

describe('#HealthcheckController', () => {

  describe('#healthCheck', () => {
    it('Should retrieve health status successfully', (done) => {
      request.agent(sails.hooks.http.app)
        .get('/api/v1/healthcheck')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('REQ_SUCCESS');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('data').to.be.a('object');

          done(err);
        });
    });
  });

});
