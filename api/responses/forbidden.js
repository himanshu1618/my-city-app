/**
 * 403 (Forbidden) Response
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.forbidden()`
 * automatically.
 */

const _ = require('lodash');

module.exports = function forbidden(data) {
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
    code: 'FORBIDDEN',
    message: (data && data.message) || 'generic.forbidden_msg',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    additionalInfo: additionalInfo
  };

  sails.log.debug('Sending forbidden', info);

  // Set status code
  res.status(403);
  return res.json(info);
};
