/**
 * `tasks/register/linkAssetsBuild.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/link-assets-build.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('linkAssetsBuild', [
    'sails-linker:devJsRelative',
    'sails-linker:devVendorStylesRelative',
    'sails-linker:devStylesRelative',
    'sails-linker:devTpl',
    'sails-linker:devJsRelativePug',
    'sails-linker:devVendorStylesRelativePug',
    'sails-linker:devStylesRelativePug',
    'sails-linker:devTplPug'
  ]);
};
