/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const _ = require('lodash');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {

  tableName: 'user',

  schema: true,

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: 'string',
      columnType: 'varchar (12)',
      allowNull: false
    },
    password: {
      type: 'string',
      columnType: 'varchar (72)',
      allowNull: false
    },
    email: {
      type: 'string',
      columnType: 'varchar (128)',
      allowNull: false
    },
    firstname: {
      type: 'string',
      columnType: 'varchar (24)',
      allowNull: false
    },
    lastname: {
      type: 'string',
      columnType: 'varchar (24)',
      allowNull: false
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  beforeCreate: function(user, cb) {
    user.id = uuid.validate(user.id) ? user.id : uuid.v4();
    sails.log.debug('Encryping user password', { username: user.username });
    bcrypt.genSalt(sails.config.constants.BCRYPT_SALT_SIZE, (err, salt) => {
      if (err) {
        return cb(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return cb(err); }
        user.password = hash;
        return cb();
      });
    });
  },

  customToJSON: function() {
    // Return a shallow copy of this record with the password removed.
    return _.omit(this, ['password']);
  },

  getByIdOrUserName: (val) => {
    return User.findOne().where({
      or: [
        {
          id: val
        },
        {
          username: val
        }
      ]
    });
  }

};
