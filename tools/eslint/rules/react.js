module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'standard-jsx'
  ],

  plugins: [
    'react'
  ],

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },

  env: {
    es6: true,
    node: true,
    browser: true,
    jquery: true,
    jest: true
  },

  rules: {
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true
      }
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never'
      }
    ],
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/jsx-space-before-closing': 'off',
    'react/jsx-fragments': 'off'
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json']
      }
    },
    react: {
      pragma: 'React',
      version: '16.13'
    }
  }
};
