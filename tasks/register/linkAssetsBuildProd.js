/**
 * `tasks/register/linkAssetsBuildProd.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/link-assets-build-prod.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('linkAssetsBuildProd', [
    'sails-linker:prodJsRelative',
    'sails-linker:prodVendorStylesRelative',
    'sails-linker:prodStylesRelative',
    'sails-linker:devTpl',
    'sails-linker:prodJsRelativePug',
    'sails-linker:prodVendorStylesRelativePug',
    'sails-linker:prodStylesRelativePug',
    'sails-linker:devTplPug'
  ]);
};
