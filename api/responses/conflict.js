/**
 * 409 (Conflict) Response
 *
 * Usage:
 * return res.conflict();
 * return res.conflict(err);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.conflict()`
 * automatically.
 */

const _ = require('lodash');

module.exports = function conflict(data) {
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
    code: 'CONFLICT',
    message: (data && data.message) || 'generic.conflict_msg',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    additionalInfo: additionalInfo
  };

  sails.log.debug('Sending conflict', info);

  // Set status code
  res.status(409);
  return res.json(info);
};
