/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

const passport = require('passport');

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'xssHeader',
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'disablePoweredBy',
      'router',
      'www',
      'favicon'
    ],

    passportInit: passport.initialize(),
    passportSession: passport.session(),

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   const skipper = require('skipper');
    //   const middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

    // Set X-XSS-Protection response header to instruct the browser to
    // thwart most known XSS attacks.
    xssHeader: function(req, res, next) {
      res.set('X-XSS-Protection', '1; mode=block');
      next();
    },

    // disable powered by header
    disablePoweredBy: function(req, res, next) {
      sails.hooks.http.app.disable('x-powered-by');
      next();
    }

  },

  trustProxy: true

};
