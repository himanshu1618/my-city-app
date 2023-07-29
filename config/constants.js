const path = require('path');

module.exports.constants = Object.freeze({
  APP_ROOT: path.resolve(__dirname, '..'),
  CLS_NAMESPACE_NAME: 'cls_ns',
  CLS_REQUEST_ID_KEY: 'request_id',
  REQUEST_ID_HEADER: 'x-request-id',
  BCRYPT_SALT_SIZE: 10,
  null: null
});
