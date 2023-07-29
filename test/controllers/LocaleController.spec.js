'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const helperUtil = require('../../api/utils/helperUtil');

describe('#LocaleController', () => {

  describe('#getTranslation', () => {
    it('Should retrieve translation successfully', (done) => {
      request.agent(sails.hooks.http.app)
        .get('/api/v1/translation')
        .query({ locale: 'en' })
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

    it('Should retrieve fallback translation for random locale rsuccessfully', (done) => {
      request.agent(sails.hooks.http.app)
        .get('/api/v1/translation')
        .query({ locale: 'xxxx' })
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

    it('Should throw an error when something goes wrong', (done) => {
      sinon.stub(helperUtil, 'evaluateLocale').returns('error');

      request.agent(sails.hooks.http.app)
        .get('/api/v1/translation')
        .query({ locale: 'xxxx' })
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          helperUtil.evaluateLocale.restore();
          done(err);
        });
    });
  });

});
