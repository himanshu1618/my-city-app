'use strict';

const winston = require('winston');
const stackTrace = require('stack-trace');

/**
 * Based on passed options set the log object
 * @param   {string}    level
 * @param   {string}    message
 * @param   {object}    options
 * @returns {object}    log object
 */
function getLogObject(level, message, options = {}) {
  let constants = null;
  if (typeof (sails) === 'object') {
    constants = sails.config.constants;
  } else {
    constants = require('constants');
  }

  const logObj = {
    time: (new Date()).toISOString(),
    level: level.toUpperCase()
  };

  // Log where we logged from
  const trace = stackTrace.get()[13];
  const file = trace.getFileName().substr(constants.APP_ROOT.length + 1);
  const line = trace.getLineNumber();
  const func = trace.getFunctionName();
  logObj.where = {
    file: file,
    line: line,
    func: func
  };

  // set the message in the log payload if present
  if (undefined !== message) {
    logObj.message = message;
  }

  // HACK -- keys from the 2nd arg to the sails.logger.XXX(message, data)
  // call are merged into options object, so remove message, level, and
  // request-id, leaving remaining keys for data.
  delete options[constants.CLS_REQUEST_ID_KEY];

  if (Object.keys(options).length > 0) {
    // set remaining options data under 'options' property in logs
    logObj.data = options;
  }

  return logObj;
}

module.exports = {
  /**
   * Setup winston logger to add file and console transports.
   * @return {Object} logger object
   */
  init: function() {
    const consoleOptions = {
      level: 'info',
      colorize: false,
      json: true,
      handleExceptions: true,
      silent: false
    };

    const logFormat = winston.format.printf(({ level, message, ...meta }) => {
      const logObj = getLogObject(level, message, meta);
      return JSON.stringify(logObj);
    });

    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.splat(),
        logFormat
      ),
      transports: [
        new (winston.transports.Console)(consoleOptions)
      ],
      exitOnError: false
    });

    return logger;
  }
};
