/**
 * LocaleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');
let fs = require('fs');
const Promise = require('bluebird');
fs = Promise.promisifyAll(fs);

const helperUtil = require('../utils/helperUtil');
const localizedStringsStore = {};

module.exports = {

  /**
  * @swagger
  * /api/v1/translation:
  *   get:
  *     tags:
  *       - Locale
  *     summary: This service will offer the translation
  *     responses:
  *      200:
  *        description: Translation retrived successfully
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Success'
  */
  getTranslation: function(req, res) {
    const locale = helperUtil.evaluateLocale(req.param('locale'));
    const localeFilePath = path.join(__dirname, '..', '..', sails.config.i18n.localesDirectory, locale + '.json');

    if (localizedStringsStore[locale]) {
      return res.ok({ data: localizedStringsStore[locale] });
    }

    fs.readFileAsync(localeFilePath, 'utf8')
      .then((content) => {
        localizedStringsStore[locale] = JSON.parse(content);
        sails.log.info('Successfully fetched translation content', { locale, locale_file_path: localeFilePath });
        return res.ok({ data: localizedStringsStore[locale] });
      }).catch((err) => {
        err.data = err.data || {};
        err.data.locale = locale;
        err.data.locale_file_path = localeFilePath;
        sails.log.info('Some error occurred while fetching translation content', err);
        return res.serverError(err);
      });
  }

};
