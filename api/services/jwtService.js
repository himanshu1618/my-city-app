'use strict';

const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

module.exports = {

  /**
   * Create JWT token
   *
   * @param {Object} user
   */
  createToken: (user) => {
    const jwtConfig = sails.config.jwt;

    const token = jwt.sign({ user: user }, jwtConfig.secret, {
      algorithm: jwtConfig.algorithm,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
      expiresIn: jwtConfig.expiresIn
    });

    return token;
  },

  /**
   * Verify JWT token
   *
   * @param {String} token
   */
  verifyToken: (token) => {
    const jwtConfig = sails.config.jwt;

    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secret, {
        algorithm: jwtConfig.algorithm,
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience,
        expiresIn: jwtConfig.expiresIn,
        ignoreExpiration: jwtConfig.ignoreExpiration
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

};
