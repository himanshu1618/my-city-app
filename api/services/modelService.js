'use strict';

const _ = require('lodash');

const helperUtil = require('../utils/helperUtil');

module.exports = {

  /**
   * Sanitize find parameter
   */
  sanitizeFindParameter: ({ where = {}, limit = 10, skip = 0, sort = [], select = [] }) => {
    const condition = {};
    condition.where = _.isPlainObject(where) ? where : {};
    condition.limit = helperUtil.toInteger(limit) || 10;
    condition.skip = helperUtil.toInteger(skip) || 0;

    if ((_.isArray(sort) || _.isPlainObject(sort) || _.isString(sort)) && !_.isEmpty(sort)) {
      condition.sort = sort;
    }
    if (_.isArray(select) && !_.isEmpty(select)) {
      condition.select = select;
    }

    sails.log.debug('Sanitized find parameter', { input: { where, limit, skip, sort, select }, output: condition });
    return condition;
  }

};
