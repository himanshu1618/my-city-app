process.env.NODE_ENV = 'test';

const Sails = require('sails');
const Fixted = require('fixted');

const PORT = 1339;

before(function(done) {
  const config = {
    port: PORT,
    log: {
      level: 'error'
    },
    datastores: {
      mysqlMyDBServer: {
        adapter: 'sails-disk',
        inMemoryOnly: true
      }
    },
    hooks: {
      grunt: false,
      session: false,
      sockets: false,
      webpack: false
    },
    models: {
      migrate: 'drop'
    },
    policies: {
      moduleDefinitions: {
      }
    },
    jwtHeader: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LnRlc3QiLCJmaXJzdG5hbWUiOiJUZXN0RiIsImxhc3RuYW1lIjoiVGVzdEwifSwiaWF0IjoxNTk2NjQ0MTYwLCJhdWQiOiJteWNpdHlhcHAuY29tIiwiaXNzIjoibXljaXR5YXBwLmNvbSJ9.rBC5dj_AmfkYUuQQZw8yGUg6tJ1X6Ncsk5NSZaY6_es',
    api: {
    }
  };

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(25000);

  Sails.lift(config, (err) => {
    if (err) {
      return done(err);
    }

    const fixted = new Fixted(process.cwd() + '/test/fixtures');
    const loadOrder = ['user', 'status', 'city', 'mycity'];
    fixted.populate(loadOrder, (err) => {
      done(err);
    });
  });
});

after((done) => {
  Sails.lower(done);
});
