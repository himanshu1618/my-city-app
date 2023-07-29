'use strict';

const path = require('path');
const _ = require('lodash');
const ipaddr = require('ipaddr.js');
const getIP = require('ipware')(path.join(__dirname, '../..', 'config/ipware.json')).get_ip;

module.exports = {

  /**
   * Returns users IP address
   *
   * @param  {Object}  req
   * @return {String}  IP Address of user
   */
  getUserIP: function(req) {
    const ipInfo = getIP(req);
    const ip = ipaddr.process(ipInfo.clientIp);
    return ip.toString();
  },

  /**
   * To get the current time
   */
  getCurrentTime: () => {
    return new Date().getTime();
  },

  /**
   * To get the time difference
   *
   * @param  {Number}  startDate
   * @param  {Number}  endDate
   */
  getResponseTime: function(startDate, endDate) {
    return endDate - startDate;
  },

  /**
   * Resolve given input to ineteger
   *
   * @param {Number|String} val
   */
  toInteger: function(val) {
    return _.isInteger(val) ? val : (_.isString(val) && /^\d+$/.test(val)) ? parseInt(val) : NaN;
  },

  /**
   * Resolve given input to float
   *
   * @param {Number|String} val
   */
  toFloat: function(val) {
    return _.isNumber(val) ? val : (_.isString(val) && /^[+]?\d+(\.\d+)?$/.test(val)) ? parseFloat(val) : NaN;
  },

  /**
   * Is valid Hex color
   *
   * @param {String} val
   */
  isHexColor: function(val) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(val);
  },

  /**
   * This will check if locale that has been passed as param is supported or not!
   * if yes then it will return it, else it will return default locale.
   *
   * @param  {String}  locale locale language which we want to evaluate
   * @return {String}
   */
  evaluateLocale: function(locale) {
    if ((typeof locale !== 'string') || sails.config.i18n.locales.indexOf(locale) === -1) {
      return sails.config.i18n.defaultLocale;
    }
    return locale;
  }

};
