module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    Promise: true,
    sails: true,
    _: true
  },
  plugins: [
    'promise',
    'chai-expect',
    'import',
    'filenames',
    'security'
  ],
  /**
   * 'off' or 0 - turn the rule off
   * 'warn' or 1 - turn the rule on as a warning (doesn't affect exit code)
   * 'error' or 2 - turn the rule on as an error (exit code is 1 when triggered)
   */
  rules: {
    'prefer-arrow-callback': [1, { allowNamedFunctions: true }],
    'prefer-promise-reject-errors': [
      0,
      { allowEmptyReject: true }
    ],
    'no-throw-literal': 2,
    'no-void': 2,
    'no-unused-labels': 2,
    'no-setter-return': 1,
    'no-self-compare': 2,
    'no-self-assign': 2,
    'no-script-url': 2,
    'no-return-assign': 2,
    'no-sequences': 2,
    'no-redeclare': [
      1,
      { builtinGlobals: true }
    ],
    'no-lone-blocks': 2,
    'no-import-assign': 1,
    'no-implied-eval': 2,
    'no-implicit-globals': 0,
    'dot-notation': [
      2,
      { allowKeywords: true }
    ],
    'dot-location': [
      2,
      'property'
    ],
    'no-case-declarations': 2,
    curly: [
      1,
      'all'
    ],
    'class-methods-use-this': [
      0,
      { exceptMethods: [] }
    ],
    'block-scoped-var': 2,
    'callback-return': [
      2,
      ['done', 'proceed', 'next', 'onwards', 'callback', 'cb']
    ],
    complexity: [
      0,
      11
    ],
    'brace-style': [
      'error',
      '1tbs',
      { allowSingleLine: true }
    ],
    'no-use-before-define': [
      2, {
        functions: false
      }
    ],
    quotes: [1, 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    'no-undef': 2,
    'no-unexpected-multiline': 1,
    'no-unreachable': 1,
    'no-unused-vars': 2,
    'space-before-function-paren': [
      2, {
        anonymous: 'ignore',
        named: 'never'
      }
    ],
    'no-empty': [
      2, {
        allowEmptyCatch: true
      }
    ],
    'array-bracket-spacing': [
      2,
      'never'
    ],
    'space-in-parens': [
      2,
      'never'
    ],
    'quote-props': [
      2,
      'as-needed'
    ],
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'space-unary-ops': [
      2, {
        words: true,
        nonwords: false
      }
    ],
    'no-mixed-spaces-and-tabs': 2,
    'no-trailing-spaces': 1,
    'comma-dangle': [
      2,
      'never'
    ],
    yoda: [
      2,
      'never'
    ],
    'no-with': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
        maxEOF: 1
      }
    ],
    'block-spacing': [
      2,
      'always'
    ],
    'space-before-blocks': [
      2,
      'always'
    ],
    'wrap-iife': 2,
    'one-var': [
      1,
      'never'
    ],
    'one-var-declaration-per-line': [
      2,
      'always'
    ],
    'comma-style': [
      1,
      'last'
    ],
    'comma-spacing': [
      2, {
        before: false,
        after: true
      }
    ],
    'space-infix-ops': 2,
    camelcase: [
      1, {
        properties: 'always'
      }
    ],
    'eol-last': 1,
    'handle-callback-err': 2,
    'keyword-spacing': [
      2, {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true }
        }
      }
    ],
    'max-depth': [
      0,
      4
    ],
    'max-statements-per-line': [
      0,
      { max: 1 }
    ],
    'multiline-ternary': [
      0,
      'never'
    ],
    'newline-after-var': 0,
    'newline-before-return': 0,
    'consistent-this': [
      2,
      '_this'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    indent: [
      1,
      2, {
        SwitchCase: 1,
        MemberExpression: 'off',
        FunctionDeclaration: { body: 1, parameters: 'off' },
        FunctionExpression: { body: 1, parameters: 'off' },
        CallExpression: { arguments: 'off' },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ignoredNodes: ['ConditionalExpression']
      }
    ],
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-dupe-else-if': 1,
    'no-extra-semi': 1,
    'no-labels': 2,
    'no-irregular-whitespace': [2, { skipComments: true }],
    semi: [
      1,
      'always'
    ],
    'semi-spacing': [
      1, {
        before: false,
        after: true
      }
    ],
    'semi-style': [1, 'last'],
    'no-whitespace-before-property': 2,
    'computed-property-spacing': [
      2,
      'never'
    ],
    'no-continue': 0,
    'no-lonely-if': 0,
    'object-curly-spacing': [
      2,
      'always'
    ],
    'max-len': [
      2,
      120,
      2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    eqeqeq: [
      2,
      'always'
    ],
    // promise rules
    'promise/always-return': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'off',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
    // chai-expect rules
    'chai-expect/missing-assertion': 2,
    'chai-expect/terminating-properties': 1,
    // import rules
    'import/default': 'error',
    'import/no-commonjs': 'off', // ES5
    'import/export': 'error',
    'import/extensions': ['error', {
      json: 'always',
      js: 'never'
    }],
    'import/imports-first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'off',
    'import/no-deprecated': 'off',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['test/**', 'tools/**', 'assets/js/webcomponent/**']
    }],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-namespace': 'warn',
    'import/no-nodejs-modules': 'off',
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
    }],
    'import/prefer-default-export': 'warn',
    // filename rules
    'filenames/match-exported': ['off', { // will re-enable this when PR is accepted
      transform: 'snake'
    }],
    'filenames/match-regex': ['error', /^[A-Za-z0-9_.]+$/],
    'filenames/no-index': 'off',
    // security
    'security/detect-buffer-noassert': 'warn',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'warn',
    'security/detect-eval-with-expression': 'warn',
    'security/detect-new-buffer': 'warn',
    'security/detect-no-csrf-before-method-override': 'warn',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-non-literal-require': 'warn',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-pseudoRandomBytes': 'warn',
    'security/detect-unsafe-regex': 'warn'
  }
};
