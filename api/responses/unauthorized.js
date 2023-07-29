/**
 * 401 (Unauthorized) Response
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(err);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.unauthorized()`
 * automatically.
 */

const _ = require('lodash');

module.exports = function unauthorized(data) {
  const req = this.req;
  const res = this.res;
  const sails = req._sails;

  let additionalInfo = [];
  if (_.isArray(data)) {
    additionalInfo = data;
  } else if (data) {
    additionalInfo = [data];
  }

  const info = {
    code: 'UNAUTHORIZED',
    message: (data && data.message) || 'generic.unauthorized_msg',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    additionalInfo: additionalInfo
  };

  sails.log.debug('Sending unauthorized', info);

  // Set status code
  res.status(401);
  return res.json(info);
};
