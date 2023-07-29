/**
 * 400 (Bad Request) Response
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(err);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.badRequest()`
 * automatically.
 */

const _ = require('lodash');

module.exports = function badRequest(data) {
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
    code: 'BAD_REQUEST',
    message: (data && data.message) || 'generic.bad_request_msg',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    additionalInfo: additionalInfo
  };

  sails.log.debug('Sending bad request', info);

  // Set status code
  res.status(400);
  return res.json(info);
};
