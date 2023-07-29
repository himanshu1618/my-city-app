/**
 * MyCity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'my_city',

  schema: true,

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    startDate: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'start_date',
      allowNull: false
    },
    endDate: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'end_date',
      allowNull: false
    },
    price: {
      type: 'number',
      columnType: 'float',
      allowNull: false
    },
    color: {
      type: 'string',
      columnType: 'char (7)',
      allowNull: false,
      isHexColor: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    city: {
      model: 'city',
      columnType: 'varchar (36)',
      columnName: 'city_id',
      allowNull: false
    },
    status: {
      model: 'status',
      columnType: 'varchar (36)',
      columnName: 'status_id',
      allowNull: false
    }
  },

  /**
   * Sanitize where parameter
   */
  sanitizeWhereParameter: (where) => {
    const newWhere = {};

    for (const key in where) {
      switch (key) {
        case 'startDate': {
          if (where[key] instanceof Date) {
            newWhere[key] = { '>=': where[key] };
          }
          break;
        }
        case 'endDate': {
          if (where[key] instanceof Date) {
            newWhere[key] = { '<=': where[key] };
          }
          break;
        }
        case 'price': {
          newWhere[key] = { '>=': where[key] };
          break;
        }
        default: {
          newWhere[key] = where[key];
        }
      }
    }

    sails.log.debug('Sanitized where parameter for my city', newWhere);
    return newWhere;
  },

  getCount: (condition = {}) => {
    // sails.getDatastore('mysqlMyDBServer').sendNativeQuery('SELECT count(*) as count FROM my_db.my_city');
    return MyCity.count(condition);
  },

  getAll: (condition = {}) => {
    return MyCity.find(condition)
      .populate('city')
      .populate('status');
  },

  getAllPaginated: (condition = {}, page = 0, limit = 10) => {
    return MyCity.find(condition)
      .populate('city')
      .populate('status')
      .paginate(page, limit);
  },

  getById: (id) => {
    return MyCity.findOne({ id: id })
      .populate('city')
      .populate('status');
  }
};
