module.exports = {
  extends: [
    './rules/node',
    './rules/react'
  ].map(require.resolve),
  root: true,
  globals: {
    User: true,
    City: true,
    Status: true,
    MyCity: true,
    userService: true,
    authService: true,
    modelService: true,
    myCityService: true,
    jwtService: true
  }
};
