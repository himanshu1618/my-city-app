const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const verifyHandler = (username, password, done) => {
  process.nextTick(() => {
    sails.log.debug('Passport verifing user credentials', { username });
    authService.performLogin(username, password)
      .then((result) => {
        return done(null, result);
      }).catch((err) => {
        done(err);
      });
  });
};

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, verifyHandler));

passport.serializeUser((user, done) => {
  sails.log.debug('Passport serializing user', { user });
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  sails.log.debug('Passport deserializing user', { username });
  userService.getUserByUsername(username)
    .then((user) => {
      sails.log.debug('Passport deserializing user', { username });
      return done(null, user);
    }).catch((err) => {
      err.data = err.data || {};
      err.data.username = username;
      sails.log.error('Some error occurred while deserializing user', err);
      done(err);
    });
});

module.exports.passport = passport;
