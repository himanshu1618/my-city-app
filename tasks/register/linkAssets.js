/**
 * `tasks/register/linkAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/link-assets.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('linkAssets', [
    'sails-linker:devJs',
    'sails-linker:devVendorStyles',
    'sails-linker:devStyles',
    'sails-linker:devTpl',
    'sails-linker:devJsPug',
    'sails-linker:devVendorStylesPug',
    'sails-linker:devStylesPug',
    'sails-linker:devTplPug'
  ]);
};
