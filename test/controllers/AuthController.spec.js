'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const error = new Error('You did something really bad');

describe('#AuthController', () => {

  describe('#login', () => {
    it('Should perform login', (done) => {

      request.agent(sails.hooks.http.app)
        .post('/api/v1/login')
        .expect(200)
        .expect('Content-Type', /json/)
        .send({ username: 'test', password: 'test' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('REQ_SUCCESS');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('data').to.be.a('object');

          done(err);
        });
    });

    it('Should handle 400 error while performing login', (done) => {
      request.agent(sails.hooks.http.app)
        .post('/api/v1/login')
        .expect(400)
        .expect('Content-Type', /json/)
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('BAD_REQUEST');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          done(err);
        });
    });

    it('Should handle 401 error while performing login', (done) => {
      request.agent(sails.hooks.http.app)
        .post('/api/v1/login')
        .send({ username: 'test', password: 'test2' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('UNAUTHORIZED');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          done(err);
        });
    });

    it('Should handle 404 error while performing login', (done) => {
      request.agent(sails.hooks.http.app)
        .post('/api/v1/login')
        .send({ username: 'test2', password: 'test2' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('NOT_FOUND');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          done(err);
        });
    });

    it('Should throw an error when something goes wrong', (done) => {
      sinon.stub(authService, 'performLogin').rejects(error);

      request.agent(sails.hooks.http.app)
        .post('/api/v1/login')
        .expect(500)
        .expect('Content-Type', /json/)
        .send({ username: 'test2', password: 'test2' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          authService.performLogin.restore();
          done(err);
        });
    });

  });

  describe('#signup', () => {
    it('Should perform signup', (done) => {
      request.agent(sails.hooks.http.app)
        .post('/api/v1/signup')
        .expect(200)
        .expect('Content-Type', /json/)
        .send({ firstname: 'Test F2', lastname: 'Test L2', email: 'test2@test.test', username: 'test2', password: 'test2' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('REQ_SUCCESS');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('data').to.be.a('object');

          done(err);
        });
    });

    it('Should handle 400 error while performing signup', (done) => {
      sinon.stub(authService, 'performSignup').resolves({});

      request.agent(sails.hooks.http.app)
        .post('/api/v1/signup')
        .expect(400)
        .expect('Content-Type', /json/)
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('BAD_REQUEST');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          authService.performSignup.restore();
          done(err);
        });
    });

    it('Should handle 400 error when username exists while signup', (done) => {
      sinon.stub(authService, 'performSignup').resolves({});

      request.agent(sails.hooks.http.app)
        .post('/api/v1/signup')
        .expect(400)
        .expect('Content-Type', /json/)
        .send({ firstname: 'Test F2', lastname: 'Test L2', email: 'test2@test.test', username: 'test', password: 'test2' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('BAD_REQUEST');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          authService.performSignup.restore();
          done(err);
        });
    });

    it('Should handle 409 error while performing signup', (done) => {
      error.statusCode = 409;
      sinon.stub(authService, 'performSignup').rejects(error);

      request.agent(sails.hooks.http.app)
        .post('/api/v1/signup')
        .expect(409)
        .expect('Content-Type', /json/)
        .send({ firstname: 'Test F3', lastname: 'Test L3', email: 'test3@test.test', username: 'test3', password: 'test3' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('CONFLICT');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          delete error.statusCode;
          authService.performSignup.restore();
          done(err);
        });
    });

    it('Should throw an error when something goes wrong', (done) => {
      sinon.stub(authService, 'performSignup').rejects(error);

      request.agent(sails.hooks.http.app)
        .post('/api/v1/signup')
        .expect(500)
        .expect('Content-Type', /json/)
        .send({ firstname: 'Test F3', lastname: 'Test L3', email: 'test3@test.test', username: 'test3', password: 'test3' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('code').to.be.a('string').to.equal('SERVER_ERROR');
          expect(res.body).to.have.property('message').to.be.a('string');
          expect(res.body).to.have.property('traceId').to.be.a('string');
          expect(res.body).to.have.property('additionalInfo').to.be.a('array');

          authService.performSignup.restore();
          done(err);
        });
    });

  });

  describe('#logout', () => {
    it('Should perform logout', (done) => {
      request.agent(sails.hooks.http.app)
        .post('/api/v1/logout')
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
