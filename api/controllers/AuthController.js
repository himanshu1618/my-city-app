/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const _ = require('lodash');
const passport = require('passport');
const { validationResult } = require('express-validator');
const authService = require('../services/authService');

module.exports = {

  /**
  * @swagger
  * /api/v1/login:
  *   post:
  *     tags:
  *       - Auth
  *     summary: This service will offer the login
  *     responses:
  *      200:
  *        description: Successfully logged in
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  login: function(req, res) {
    const username = _.trim(req.param('username'));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.badRequest(errors.array());
    }

    passport.authenticate('local', { session: false }, (err, user) => {
      if (user) {
        sails.log.info('User credential are valid', { username });
        return res.ok({ data: user });
      }

      err.data = err.data || {};
      err.data.username = username;

      if (err.statusCode === 404) {
        sails.log.error('User does not exists', err);
        return res.notFound({ param: 'username', msg: 'user.validation.username.invalid' });
      }

      if (err.statusCode === 401) {
        sails.log.error('User credential are not valid', err);
        return res.unauthorized({ param: 'password', msg: 'user.validation.password.invalid' });
      }

      sails.log.error('Some error occurred while login', err);
      return res.serverError({ message: 'generic.server_error_msg' });
    })(req, res);
  },

  /**
  * @swagger
  * /api/v1/signup:
  *   post:
  *     tags:
  *       - Auth
  *     summary: This service will offer the signup
  *     responses:
  *      200:
  *        description: Successfully sign up
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  signup: function(req, res) {
    const firstname = _.trim(req.param('firstname'));
    const lastname = _.trim(req.param('lastname'));
    const email = _.trim(req.param('email'));
    const username = _.trim(req.param('username'));
    const password = req.param('password');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.badRequest(errors.array());
    }

    sails.log.info('Signup validation passed, performing signup', { firstname, lastname, email, username });
    authService.performSignup({ firstname, lastname, email, username, password })
    .then((result) => {
      sails.log.info('User successfully signed up', { username });
      return res.ok({ data: result });
    }).catch((err) => {
      err.data = err.data || {};
      err.data.firstname = firstname;
      err.data.lastname = lastname;
      err.data.email = email;
      err.data.username = username;

      if (err.statusCode === 409) {
        sails.log.error('User alrady exists', err);
        return res.conflict({ param: 'username', msg: 'user.validation.username.unavailable' });
      }

      sails.log.error('Some error occurred while signup', err);
      return res.serverError({ message: 'generic.server_error_msg' });
    });
  },

  /**
  * @swagger
  * /api/v1/logout:
  *   post:
  *     tags:
  *       - Auth
  *     summary: This service will offer the logout
  *     responses:
  *      200:
  *        description: Successfully logout
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  logout: function(req, res) {
    req.session && req.session.destroy && req.session.destroy();
    return res.ok();
  }

};
