/**
 * `tasks/config/sails-linker`
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags and <link> tags into the specified
 * specified HTML and/or EJS files.  The specified delimiters (`startTag`
 * and `endTag`) determine the insertion points.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/sails-linker.js
 *
 */
module.exports = function(grunt) {

  const cachebuster = '?' + Math.random();

  grunt.config.set('sails-linker', {


    //   ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗
    //   ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║
    //  ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩
    //  ┌─    ┌─┐┬  ┬┌─┐┌┐┌┌┬┐  ┌─┐┬┌┬┐┌─┐   ┬┌─┐┬  ┬┌─┐┌─┐┌─┐┬─┐┬┌─┐┌┬┐    ─┐
    //  │───  │  │  │├┤ │││ │───└─┐│ ││├┤    │├─┤└┐┌┘├─┤└─┐│  ├┬┘│├─┘ │   ───│
    //  └─    └─┘┴─┘┴└─┘┘└┘ ┴   └─┘┴─┴┘└─┘  └┘┴ ┴ └┘ ┴ ┴└─┘└─┘┴└─┴┴   ┴     ─┘
    devJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    devJsBuild: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/**/*.ejs': ['.tmp/public/min/production.min.js']
      }
    },

    prodJsBuild: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/dist/*.js'],
        'views/**/*.html': ['.tmp/public/dist/*.js'],
        'views/**/*.ejs': ['.tmp/public/dist/*.js']
      }
    },


    //  ╔═╗╔╦╗╦ ╦╦  ╔═╗╔═╗╦ ╦╔═╗╔═╗╔╦╗╔═╗
    //  ╚═╗ ║ ╚╦╝║  ║╣ ╚═╗╠═╣║╣ ║╣  ║ ╚═╗
    //  ╚═╝ ╩  ╩ ╩═╝╚═╝╚═╝╩ ╩╚═╝╚═╝ ╩ ╚═╝
    //  ┌─    ┬┌┐┌┌─┐┬  ┬ ┬┌┬┐┬┌┐┌┌─┐  ╔═╗╔═╗╔═╗   ┬   ┌─┐┌─┐┌┬┐┌─┐┬┬  ┌─┐┌┬┐  ╦  ╔═╗╔═╗╔═╗    ─┐
    //  │───  │││││  │  │ │ │││││││ ┬  ║  ╚═╗╚═╗  ┌┼─  │  │ ││││├─┘││  ├┤  ││  ║  ║╣ ╚═╗╚═╗  ───│
    //  └─    ┴┘└┘└─┘┴─┘└─┘─┴┘┴┘└┘└─┘  ╚═╝╚═╝╚═╝  └┘   └─┘└─┘┴ ┴┴  ┴┴─┘└─┘─┴┘  ╩═╝╚═╝╚═╝╚═╝    ─┘
    devVendorStyles: {
      options: {
        startTag: '<!--VENDOR-STYLES-->',
        endTag: '<!--VENDOR-STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s' + cachebuster +'">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').vendorCSSFilesToInject,
        'views/**/*.html': require('../pipeline').vendorCSSFilesToInject,
        'views/**/*.ejs': require('../pipeline').vendorCSSFilesToInject
      }
    },

    devVendorStylesRelative: {
      options: {
        startTag: '<!--VENDOR-STYLES-->',
        endTag: '<!--VENDOR-STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s' + cachebuster +'">',
        appRoot: '.tmp/public',
        relative: true
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').vendorCSSFilesToInject,
        'views/**/*.html': require('../pipeline').vendorCSSFilesToInject,
        'views/**/*.ejs': require('../pipeline').vendorCSSFilesToInject
      }
    },

    prodVendorStyles: {
      options: {
        startTag: '<!--VENDOR-STYLES-->',
        endTag: '<!--VENDOR-STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s' + cachebuster +'">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/production-vendor.min.css'],
        'views/**/*.html': ['.tmp/public/min/production-vendor.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/production-vendor.min.css']
      }
    },

    prodVendorStylesRelative: {
      options: {
        startTag: '<!--VENDOR-STYLES-->',
        endTag: '<!--VENDOR-STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s' + cachebuster +'">',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/production-vendor.min.css'],
        'views/**/*.html': ['.tmp/public/min/production-vendor.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/production-vendor.min.css']
      }
    },

    devStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    devStylesBuild: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/production.min.css']
      }
    },

    prodStylesBuild: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/dist/*.css'],
        'views/**/*.html': ['.tmp/public/dist/*.css'],
        'views/**/*.ejs': ['.tmp/public/dist/*.css']
      }
    },

    devJsPug: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/**/*.pug': require('../pipeline').jsFilesToInject
      }
    },

    devJsRelativePug: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s' + cachebuster +'")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        'views/**/*.pug': require('../pipeline').jsFilesToInject
      }
    },

    prodJsPug: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/**/*.pug': ['.tmp/public/min/production.min.js']
      }
    },

    prodJsRelativePug: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s' + cachebuster +'")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        'views/**/*.pug': ['.tmp/public/min/production.min.js']
      }
    },

    devVendorStylesPug: {
      options: {
        startTag: '// VENDOR-STYLES',
        endTag: '// VENDOR-STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },

      files: {
        'views/**/*.pug': require('../pipeline').vendorCSSFilesToInject
      }
    },

    devVendorStylesRelativePug: {
      options: {
        startTag: '// VENDOR-STYLES',
        endTag: '// VENDOR-STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public',
        relative: true
      },

      files: {
        'views/**/*.pug': require('../pipeline').vendorCSSFilesToInject
      }
    },

    prodVendorStylesPug: {
      options: {
        startTag: '// VENDOR-STYLES',
        endTag: '// VENDOR-STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/**/*.pug': ['.tmp/public/min/production-vendor.min.css']
      }
    },

    prodVendorStylesRelativePug: {
      options: {
        startTag: '// VENDOR-STYLES',
        endTag: '// VENDOR-STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        'views/**/*.pug': ['.tmp/public/min/production-vendor.min.css']
      }
    },

    devStylesPug: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },

      files: {
        'views/**/*.pug': require('../pipeline').cssFilesToInject
      }
    },

    devStylesRelativePug: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public',
        relative: true
      },

      files: {
        'views/**/*.pug': require('../pipeline').cssFilesToInject
      }
    },

    prodStylesPug: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/**/*.pug': ['.tmp/public/min/production.min.css']
      }
    },

    prodStylesRelativePug: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s' + cachebuster +'")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        'views/**/*.pug': ['.tmp/public/min/production.min.css']
      }
    },

    // Bring in JST template object
    devTpl: {
      options: {
        startTag: '<!--TEMPLATES-->',
        endTag: '<!--TEMPLATES END-->',
        fileTmpl: '<script type="text/javascript" src="%s' + cachebuster +'"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/jst.js'],
        'views/**/*.html': ['.tmp/public/jst.js'],
        'views/**/*.ejs': ['.tmp/public/jst.js']
      }
    },

    devTplPug: {
      options: {
        startTag: '// TEMPLATES',
        endTag: '// TEMPLATES END',
        fileTmpl: 'script(type="text/javascript", src="%s' + cachebuster +'")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/**/*.pug': ['.tmp/public/jst.js']
      }
    }

  });//</ grunt.config.set() >

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // This Grunt plugin is part of the default asset pipeline in Sails,
  // so it's already been automatically loaded for you at this point.
  //
  // Of course, you can always remove this Grunt plugin altogether by
  // deleting this file.  But check this out: you can also use your
  // _own_ custom version of this Grunt plugin.
  //
  // Here's how:
  //
  // 1. Install it as a local dependency of your Sails app:
  //    ```
  //    $ npm install grunt-sails-linker --save-dev --save-exact
  //    ```
  //
  //
  // 2. Then uncomment the following code:
  //
  // ```
  // // Load Grunt plugin from the node_modules/ folder.
  // grunt.loadNpmTasks('grunt-sails-linker');
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

};
