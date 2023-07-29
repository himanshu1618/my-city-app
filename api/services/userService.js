'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

module.exports = {

  /**
  * Get user object by username
  *
  * @param {String} username
  */
  getUserByUsername: (username) => {
    return User.findOne({ username })
      .then((user) => {
        if (_.isEmpty(user)) {
          const error = new Error('User not found');
          error.statusCode = 404;
          return Promise.reject(error);
        }

        return Promise.resolve(user);
      });
  }

};
