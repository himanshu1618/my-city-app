/**
 * 400 (Not Found) Response
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.notFound()`
 * automatically.
 */

const _ = require('lodash');

module.exports = function notFound(data) {
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
    code: 'NOT_FOUND',
    message: (data && data.message) || 'generic.not_found_msg',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    additionalInfo: additionalInfo
  };

  sails.log.debug('Sending not found', info);

  // Set status code
  res.status(404);
  return res.json(info);
};
