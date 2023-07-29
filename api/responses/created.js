/**
 * 201 (Created) Response
 *
 * Usage:
 * return res.created();
 * return res.created(data);
 * return res.created({ message: '', data: {}});
 *
 * @param  {Object} data
 */

module.exports = function sendOK(data) {
  const req = this.req;
  const res = this.res;
  const info = {
    code: 'REQ_SUCCESS',
    message: (data && data.message) || 'generic.created_msg',
    traceId: req.headers[sails.config.constants.REQUEST_ID_HEADER] || '',
    referenceInfo: '',
    data: (data && data.data) ? data.data : {}
  };

  res.status(201);
  return res.json(info);
};
