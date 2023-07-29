/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

const _ = require('lodash');

module.exports = function serverError(data) {
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
    code: 'SERVER_ERROR',
    message: (data && data.message) || 'Server Error',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    additionalInfo: additionalInfo
  };

  sails.log.debug('Sending server error', info);

  // Set status code
  res.status(500);
  return res.json(info);
};
