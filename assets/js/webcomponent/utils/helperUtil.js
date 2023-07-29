'use strict';

/**
 * It will return host origin url
 *
 * @returns {String}
 */
function getHostOriginUrl() {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//'
      + window.location.hostname
      + (window.location.port ? ':' + window.location.port : '');
  }

  return window.location.origin;
}

export default {
  getHostOriginUrl
};
