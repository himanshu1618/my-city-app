'use strict';

const _ = require('lodash');

/**
 * Checks JWT authentication and authorization
 */
module.exports = function (req, res, next) {
  const bearers = _.split(req.headers.authorization, ' ', 2);
  const strategy = _.nth(bearers, 0);
  const token = _.nth(bearers, 1);
  const action = req.options.action;

  if (strategy.toLowerCase() !== 'bearer') {
    sails.log.error('Strategy is not bearer token authentication', { strategy, action });
    return res.forbidden({ message: 'You are not permitted to perform this action.' });
  }

  if (!token) {
    sails.log.error('Auth token is not supplied', { strategy, action });
    return res.forbidden({ message: 'You are not permitted to perform this action.' });
  }

  jwtService.verifyToken(token)
    .then((user) => {
      sails.log.info('Successfully validated & authorized user token.', user);
      req.user = user;
      return next();
    }).catch((err) => {
      err.data = err.data || {};
      err.data.strategy = strategy;
      err.data.action = action;
      sails.log.error('Error in validating and authorizing user token.', err);
      return res.forbidden({ message: 'You are not permitted to perform this action.' });
    });
};
