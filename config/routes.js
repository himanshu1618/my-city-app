/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const authService = require('../api/services/authService');

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': { view: 'pages/homepage' },
  'GET /login': { view: 'pages/login' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'GET /api/v1/healthcheck': 'HealthcheckController.healthCheck',

  // Auth
  'POST /api/v1/login': [authService.validateLoginPayload(), 'AuthController.login'],
  'POST /api/v1/signup': [authService.validateSignupPayload(), 'AuthController.signup'],
  'POST /api/v1/logout': 'AuthController.logout',

  // Locale
  'GET /api/v1/translation': 'LocaleController.getTranslation',

  // City
  'GET /api/v1/city': 'CityController.getAllCity',

  // Status
  'GET /api/v1/status': 'StatusController.getAllStatus',

  // MyCity
  'GET /api/v1/mycity': 'MyCityController.getAllMyCity',
  'GET /api/v1/mycity/paginate': 'MyCityController.getAllMyCityPaginated',
  'POST /api/v1/mycity': 'MyCityController.createMyCity',
  'GET /api/v1/mycity/:id': 'MyCityController.getMyCity',
  'PUT /api/v1/mycity/:id': 'MyCityController.updateMyCity',
  'DELETE /api/v1/mycity/:id': 'MyCityController.deleteMyCity'

};
