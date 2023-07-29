'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const { body } = require('express-validator');

module.exports = {

  /**
   * validate login payload
   */
  validateLoginPayload: () => {
    return [
      body('username')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('user.validation.username.required')
        .isLength({ min: 3, max: 12 })
        .withMessage('user.validation.username.length'),
      body('password')
        .isString()
        .notEmpty()
        .withMessage('user.validation.password.required')
        .isLength({ min: 3, max: 16 })
        .withMessage('user.validation.password.length')
    ];
  },

  /**
   * validate signup payload
   */
  validateSignupPayload: () => {
    return [
      body('firstname')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('user.validation.firstname.required')
        .isLength({ min: 3, max: 24 })
        .withMessage('user.validation.firstname.length'),
      body('lastname')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('user.validation.lastname.required')
        .isLength({ max: 24 })
        .withMessage('user.validation.lastname.length'),
      body('email')
        .isEmail()
        .trim()
        .notEmpty()
        .withMessage('user.validation.email.required')
        .isLength({ max: 128 })
        .withMessage('user.validation.email.length'),
      body('username')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('user.validation.username.required')
        .isLength({ min: 3, max: 12 })
        .withMessage('user.validation.username.length')
        .custom(value => {
          return User.findOne({ username: value }).then(user => {
            if (user) {
              return Promise.reject('user.validation.username.unavailable');
            }
            return Promise.resolve();
          });
        }),
      body('password')
        .isString()
        .notEmpty()
        .withMessage('user.validation.password.required')
        .isLength({ min: 3, max: 16 })
        .withMessage('user.validation.password.length')
    ];
  },

  /**
  * Perform login by fetching user and checking password
  *
  * @param {String} username
  * @param {String} password
  */
  performLogin: async (username, password) => {
    let user;

    return User.findOne({ username })
      .then((result) => {
        if (_.isEmpty(result)) {
          const error = new Error('User not found');
          error.statusCode = 404;
          return Promise.reject(error);
        }

        user = _.pick(result, ['username', 'email', 'firstname', 'lastname']);
        return bcrypt.compare(password, result.password);
      }).then((result) => {
        if (result !== true) {
          sails.log.debug('Found user but password is invalid', { username });
          const error = new Error('User credentials are invalid');
          error.statusCode = 401;
          return Promise.reject(error);
        }

        const token = jwtService.createToken(user);
        sails.log.debug('Found user and password is also valid', { username });
        return Promise.resolve({ token, user });
      });
  },

  /**
  * Perform signup
  *
  * @param {String} username
  * @param {String} password
  */
  performSignup: async ({ firstname, lastname, email, username, password }) => {
    return User.create({ firstname, lastname, email, username, password })
    .fetch()
    .then((result) => {
      const user = _.pick(result, ['username', 'email', 'firstname', 'lastname']);
      return Promise.resolve(user);
    });
  }

};
