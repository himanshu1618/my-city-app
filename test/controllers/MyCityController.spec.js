'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const mock = require('sails-mock-models');

const error = new Error('You did something really bad');

describe('#MyCityController.spec', () => {

  describe('#getAllMyCity', () => {
    it('Should retrieve all my cities successfully', (done) => {
      request(sails.hooks.http.app)
        .get('/api/v1/mycity?limit=10&skip=0&startDate=2020-07-31&endDate=2020-08-01&price=5&color=#0f4cdb&city=test&status=test')
        .set('Authorization', sails.config.jwtHeader)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('REQ_SUCCESS');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('data').to.be.a('array');

          done(err);
        });
    });

    it('Should throw an error when invalid auth strategy provided', (done) => {
      request(sails.hooks.http.app)
        .get('/api/v1/mycity?limit=10&skip=0&startDate=2020-07-31&endDate=2020-08-01&price=5&color=#0f4cdb&city=test&status=test')
        .set('Authorization', 'xxxx ')
        .expect(403)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('FORBIDDEN');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          done(err);
        });
    });

    it('Should throw an error when auth token not provided', (done) => {
      request(sails.hooks.http.app)
        .get('/api/v1/mycity?limit=10&skip=0&startDate=2020-07-31&endDate=2020-08-01&price=5&color=#0f4cdb&city=test&status=test')
        .set('Authorization', 'Bearer ')
        .expect(403)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('FORBIDDEN');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          done(err);
        });
    });

    it('Should throw an error when invalid auth token provided', (done) => {
      request(sails.hooks.http.app)
        .get('/api/v1/mycity?limit=10&skip=0&startDate=2020-07-31&endDate=2020-08-01&price=5&color=#0f4cdb&city=test&status=test')
        .set('Authorization', 'Bearer test')
        .expect(403)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('FORBIDDEN');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          done(err);
        });
    });

    it('Should throw an error when unable to get all my cities', (done) => {
      sinon.stub(myCityService, 'getMyCities').rejects(error);

      request(sails.hooks.http.app)
        .get('/api/v1/mycity')
        .set('Authorization', sails.config.jwtHeader)
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          myCityService.getMyCities.restore();
          done(err);
        });
    });
  });

  describe('#getAllMyCityPaginated', () => {
    it('Should paginate all my cities successfully', (done) => {
      request(sails.hooks.http.app)
        .get('/api/v1/mycity/paginate?limit=10&page=0&startDate=2020-07-31&endDate=2020-08-01&price=5&color=#0f4cdb&city=test&status=test')
        .set('Authorization', sails.config.jwtHeader)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('REQ_SUCCESS');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body.data).to.have.property('page').to.be.a('number');
          expect(res.body.data).to.have.property('limit').to.be.a('number');

          done(err);
        });
    });

    it('Should throw an error when unable to get all my cities paginated', (done) => {
      sinon.stub(myCityService, 'getMyCitiesPaginated').rejects(error);

      request(sails.hooks.http.app)
        .get('/api/v1/mycity/paginate')
        .set('Authorization', sails.config.jwtHeader)
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          myCityService.getMyCitiesPaginated.restore();
          done(err);
        });
    });
  });

  describe('#createMyCity', () => {
    it('Should create my city successfully', (done) => {
      request(sails.hooks.http.app)
        .post('/api/v1/mycity')
        .set('Authorization', sails.config.jwtHeader)
        .send({ city: 'test', status: 'test', price: 5, color: '#0f4cdb', startDate: '2020-07-31', endDate: '2020-08-01' })
        .expect(201)
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

    it('Should throw an error when unable to create my city', (done) => {
      sinon.stub(myCityService, 'sanitizeMyCityPayload').rejects(error);

      request(sails.hooks.http.app)
        .post('/api/v1/mycity')
        .set('Authorization', sails.config.jwtHeader)
        .send({ city: 'test', status: 'test', price: 5, color: '#0f4cdb', startDate: '2020-07-31', endDate: '2020-08-01', sort: 'price ASC' })
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          myCityService.sanitizeMyCityPayload.restore();
          done(err);
        });
    });
  });

  describe('#getMyCity', () => {
    it('Should get my city successfully', (done) => {
      request(sails.hooks.http.app)
        .get('/api/v1/mycity/test')
        .set('Authorization', sails.config.jwtHeader)
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

    it('Should throw an error when unable to get my city', (done) => {
      mock.mockModel(MyCity, 'getById', null, error);

      request(sails.hooks.http.app)
        .get('/api/v1/mycity/test')
        .set('Authorization', sails.config.jwtHeader)
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          MyCity.getById.restore();
          done(err);
        });
    });
  });

  describe('#updateMyCity', () => {
    it('Should update my city successfully', (done) => {
      request(sails.hooks.http.app)
        .put('/api/v1/mycity/test')
        .set('Authorization', sails.config.jwtHeader)
        .send({ price: 10 })
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

    it('Should throw an error when unable to update my city', (done) => {
      mock.mockModel(MyCity, 'getById', null, error);

      request(sails.hooks.http.app)
        .put('/api/v1/mycity/test')
        .set('Authorization', sails.config.jwtHeader)
        .send({ price: 66 })
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          MyCity.getById.restore();
          done(err);
        });
    });
  });

  describe('#deleteMyCity', () => {
    it('Should delete my city successfully', (done) => {
      request(sails.hooks.http.app)
        .delete('/api/v1/mycity/test')
        .set('Authorization', sails.config.jwtHeader)
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

    it('Should throw an error when unable to delete my city', (done) => {
      mock.mockModel(MyCity, 'destroy', null, error);

      request(sails.hooks.http.app)
        .delete('/api/v1/mycity/test')
        .set('Authorization', sails.config.jwtHeader)
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          MyCity.destroy.restore();
          done(err);
        });
    });
  });

});
