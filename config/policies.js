/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  HealthcheckController: {
    healthCheck: true
  },
  AuthController: {
    login: true,
    logout: true
  },
  LocaleController: {
    getTranslation: true
  },
  CityController: {
    getAllCity: ['isJWTAuthenticated']
  },
  StatusController: {
    getAllStatus: ['isJWTAuthenticated']
  },
  MyCityController: {
    getAllMyCity: ['isJWTAuthenticated'],
    getAllMyCityPaginated: ['isJWTAuthenticated'],
    createMyCity: ['isJWTAuthenticated'],
    getMyCity: ['isJWTAuthenticated'],
    updateMyCity: ['isJWTAuthenticated'],
    deleteMyCity: ['isJWTAuthenticated']
  }

};
