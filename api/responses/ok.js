/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok({ message: '', data: {}});
 *
 * @param  {Object} data
 */

module.exports = function sendOK(data) {
  const req = this.req;
  const res = this.res;
  const info = {
    code: 'REQ_SUCCESS',
    message: (data && data.message) || 'Successfully performed an action.',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    data: (data && data.data) ? data.data : {}
  };

  res.status(200);
  return res.json(info);
};
