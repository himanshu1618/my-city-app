'use strict';

const Promise = require('bluebird');

const helperUtil = require('../utils/helperUtil');
const MyCity = require('../models/MyCity');

module.exports = {

  sanitizeMyCityPayload: async ({ startDate, endDate, price, color, city, status  }) => {
    const payload = {};
    const newStartDate = startDate && new Date(startDate);
    const newEndDate = endDate && new Date(endDate);
    const newPrice = helperUtil.toFloat(price);
    const newCity =  city && await City.getByIdOrName(city);
    const newStatus =  status && await Status.getByIdOrName(status);

    if (newStartDate && (newStartDate.toString() !== 'Invalid Date')) {
      payload.startDate = newStartDate;
    }
    if (newEndDate && (newEndDate.toString() !== 'Invalid Date')) {
      payload.endDate = newEndDate;
    }
    if (!Number.isNaN(newPrice)) {
      payload.price = newPrice;
    }
    if (helperUtil.isHexColor(color)) {
      payload.color = color;
    }
    if (newCity) {
      payload.city = newCity.id;
    }
    if (newStatus) {
      payload.status = newStatus.id;
    }

    sails.log.info('Sanitized my city payload', { input: { startDate, endDate, price, color, city, status }, output: payload });
    return payload;
  },

  /**
   * Get my cities
   */
  getMyCities: (where, limit, skip) => {
    where = MyCity.sanitizeWhereParameter(where);
    const condition = modelService.sanitizeFindParameter({ where, limit, skip });

    return MyCity.getAll(condition)
      .then((results) => {
        sails.log.info('Successfully retrived all my cities', { count: results.length, limit, skip, condition });
        return Promise.resolve(results);
      }).catch((err) => {
        err.data =  err.data || {};
        err.data.condition = where;
        err.data.limit = limit;
        err.data.skip = skip;
        sails.log.error('Error occurred while retriving all my cities', err);
        return Promise.reject(err);
      });
  },

  /**
   * Get my cities paginated
   */
  getMyCitiesPaginated: (where, page, limit, sort) => {
    page = helperUtil.toInteger(page) || 0;
    limit = helperUtil.toInteger(limit) || 10;
    where = MyCity.sanitizeWhereParameter(where);
    const condition = modelService.sanitizeFindParameter({ where, sort });

    return Promise.all([
      MyCity.getCount(where),
      MyCity.getAllPaginated(condition, page, limit)
    ]).then((results) => {
      const total = results[0];
      const items = results[1];
      sails.log.info('Successfully retrived my cities as paginated', { count: results.length, page, limit, total, sort });
      return Promise.resolve({ page, limit, total, sort, items });
    }).catch((err) => {
      err.data =  err.data || {};
      err.data.condition = condition;
      err.data.page = page;
      err.data.limit = limit;
      sails.log.error('Error occurred while retriving my cities as paginated', err);
      return Promise.reject(err);
    });
  }

};
