/**
 * ESLint JS files.
 *
 * ---------------------------------------------------------------
 *
 *
 * For usage docs see:
 *      https://github.com/sindresorhus/grunt-eslint
 */
module.exports = function(grunt) {

  grunt.config.set('eslint', {
    target: ['api/**/*.js', 'config/**/*.js', 'test/**/*.js'],
    options: {
      configFile: '.eslintrc',
      fix: true
    }
  });

  grunt.loadNpmTasks('grunt-eslint');

};
