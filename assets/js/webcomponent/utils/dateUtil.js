import moment from 'moment';

import constants from '../constants';

export const localeMapping = {
  en: 'my-locale'
};

moment.defineLocale('my-locale', {
  parentLocale: 'en'
});

export default {

  formatDate(date, format = constants.dateTimeFormat, locale) {
    if (!locale) {
      locale = localeMapping[constants.app.defaultLocale];
    }

    date = moment(date).locale(locale);
    if (date.isValid()) {
      return date.format(format);
    }

    return '';
  },

  timeSince(date, locale, compareDate) {
    if (!locale) {
      locale = localeMapping[constants.app.defaultLocale];
    }

    date = moment(date).locale(locale);

    if (compareDate) {
      return date.from(moment(compareDate));
    }

    return date.fromNow();
  }

};
