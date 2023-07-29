const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {

  grunt.registerTask('createAssetPartials', () => {
    const scriptsFname = path.resolve(__dirname, '..', '..', 'views', 'partials', '_scripts.pug');
    const stylesFname = path.resolve(__dirname, '..', '..', 'views', 'partials', '_styles.pug');

    fs.writeFile(scriptsFname, '// SCRIPTS\n// SCRIPTS END\n', (err) => {
      if (err) {
        return console.log(err);
      }
      grunt.log.writeln('Created ' + scriptsFname);
    });
    fs.writeFile(stylesFname, '// VENDOR-STYLES\n// VENDOR-STYLES END\n// STYLES\n// STYLES END\n', (err) => {
      if (err) {
        return console.log(err);
      }
      grunt.log.writeln('Created ' + stylesFname);
    });
  });

};
