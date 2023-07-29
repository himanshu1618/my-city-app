const ms = require('ms');

module.exports.jwt = {
  secret: 'vDU4bVtoAWNIlCvVhVSm42wrvDUyIQvfqn9rHxB9oLeurjgeZKtDVYWuN3ubHyh5',
  algorithm: 'HS256',
  issuer: 'mycityapp.com',
  audience: 'mycityapp.com',
  expiresIn: ms(24 * 60 * 60000),
  ignoreExpiration: false
};
