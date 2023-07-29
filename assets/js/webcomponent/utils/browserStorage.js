const browserStorage = window.browserStorage
  ? window.browserStorage
  : (window.localStorage || typeof window.localStorage.getItem === 'function')
    ? window.localStorage
    : null;

export default browserStorage;
