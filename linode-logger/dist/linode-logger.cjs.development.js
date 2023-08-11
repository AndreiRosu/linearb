'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var winston = require('winston');
var httpContext = _interopDefault(require('express-http-context'));
var _ = _interopDefault(require('lodash'));
var morgan = _interopDefault(require('morgan'));
var uuid = require('uuid');
var url = require('url');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var FIELDS_TO_OMIT = ['authorization', 'token', 'password', 'code', 'pass', 'key', 'access_token', 'access_token_secret', 'refresh_token', 'accessToken', 'refreshToken', 'cookie'];
var StringifyReplacer = function StringifyReplacer(circular, omitFields) {
  if (circular === void 0) {
    circular = true;
  }
  if (omitFields === void 0) {
    omitFields = true;
  }
  var seen = new WeakSet(); //week reference for quick gc
  return function (key, value) {
    if (circular && typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        console.error("Circular Object key detected: " + key);
        return '#CircularRefParentObject';
      }
      seen.add(value);
    }
    if (omitFields && FIELDS_TO_OMIT.includes(key) && typeof value === 'string') return value.substring(0, 3) + '*****' + value.slice(-1);
    return value;
  };
};
var SafeStringifyReplacer = function SafeStringifyReplacer(obj, omit, space) {
  try {
    return JSON.stringify(obj, StringifyReplacer(false, omit), space);
  } catch (e) {
    return JSON.stringify(obj, StringifyReplacer(true, omit), space);
  }
};
var parseURL = function parseURL(url$1) {
  try {
    var parsedUrl = new url.URL(url$1);
    var dict = {};
    parsedUrl.searchParams.forEach(function (value, key) {
      if (dict[key]) {
        dict[key].push(value);
      } else {
        dict[key] = [value];
      }
    });
    // reassign query as old url.parse
    parsedUrl['query'] = dict;
    return parsedUrl;
  } catch (e) {
    return {};
  }
};

/**
 each request will have all of the context
 */
function contextifyRequestMiddleware(req, res, next) {
  var accountId = _.get(req, 'headers.id', '').toString();
  var organizationId = _.get(req, 'headers.organization_id', '').toString();
  var headerRequestId = _.get(req, 'headers.x-request-id', null);
  var headerSourceRequestId = _.get(req, 'headers.source-x-request-id', null);
  var queryRequestId = _.get(req, 'query.x-request-id', null);
  var querySourceRequestId = _.get(req, 'query.source-x-request-id', null);
  var requestId = headerRequestId || queryRequestId || uuid.v4();
  var sourceRequestId = headerSourceRequestId || querySourceRequestId;
  var amznTraceId = _.get(req, 'headers.x-amzn-trace-id', null);
  if (!headerRequestId) {
    req.headers['x-request-id'] = requestId;
  }
  if (sourceRequestId) {
    httpContext.set('sourceRequestId', sourceRequestId);
  }
  httpContext.set('headers', _.omit(req.headers, FIELDS_TO_OMIT));
  httpContext.set('body', req.body);
  httpContext.set('params', req.params);
  httpContext.set('query', req.query);
  httpContext.set('originalUrl', req.originalUrl);
  httpContext.set('method', req.method);
  httpContext.set('amznTraceId', amznTraceId);
  httpContext.set('requestId', requestId);
  httpContext.set('accountId', accountId);
  httpContext.set('organizationId', organizationId);
  next();
}
function expressLogger(logger, consoleLevel) {
  return morgan(function (tokens, req, res) {
    var _ref;
    var amznTraceId = httpContext.get('amznTraceId');
    var logInfo = _extends({
      method: tokens.method(req, res),
      status: Number(tokens.status(req, res)),
      url: tokens.url(req, res),
      headers: httpContext.get('headers'),
      'response-time': tokens['response-time'](req, res) + " ms",
      'x-request-id': httpContext.get('requestId'),
      body: httpContext.get('body'),
      query: httpContext.get('query')
    }, amznTraceId ? (_ref = {}, _ref["x-amzn-trace-id"] = amznTraceId, _ref) : {});
    var noQsUrl = (logInfo.url || '').split('?')[0];
    logInfo.status < 400 ? logger.debug('', logInfo) : logger.error("[Extended log]: " + logInfo.status + " " + logInfo.method + " " + noQsUrl, logInfo);
  }, {
    stream: {
      //dont use write stream as we return null from the above custom formatter, and output msg from it
      write: function write(msg) {}
    },
    skip: function skip(req, res) {
      return res.statusCode > 199 && res.statusCode < 400 && consoleLevel !== 'debug';
    }
  });
}

var _excluded = ["level", "timestamp", "message"],
  _excluded2 = ["level", "timestamp", "message", "error"];
var combine = winston.format.combine,
  timestamp = winston.format.timestamp,
  printf = winston.format.printf,
  colorize = winston.format.colorize;
var DEFAULT_OPTIONS = {
  consoleLevel: 'debug'
};
var jsonFormat = /*#__PURE__*/printf(function (_ref) {
  var level = _ref.level,
    timestamp = _ref.timestamp,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? '' : _ref$message,
    ctx = _objectWithoutPropertiesLoose(_ref, _excluded);
  return SafeStringifyReplacer({
    timestamp: timestamp,
    level: level,
    message: message,
    ctx: ctx
  }, true);
});
var localFormat = /*#__PURE__*/printf(function (_ref2) {
  var level = _ref2.level,
    timestamp = _ref2.timestamp,
    _ref2$message = _ref2.message,
    message = _ref2$message === void 0 ? '' : _ref2$message,
    error = _ref2.error,
    ctx = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  return timestamp + " [" + level + "]: " + SafeStringifyReplacer({
    message: message,
    ctx: ctx
  }, false) + "\n" + ("" + (error ? SafeStringifyReplacer(error, false, 2) : ''));
});
var getOptions = function getOptions(options) {
  if (options === void 0) {
    options = {};
  }
  return Object.assign({}, DEFAULT_OPTIONS, process.env, options);
};
function addContext(key, value) {
  var _extends2;
  httpContext.set('extendedContext', _extends({}, httpContext.get('extendedContext') || {}, (_extends2 = {}, _extends2[key] = value, _extends2)));
}
function createLogger(options) {
  var _getOptions = getOptions(options),
    GIT_COMMIT_SHORT = _getOptions.GIT_COMMIT_SHORT,
    app = _getOptions.app,
    environment = _getOptions.environment,
    consoleLevel = _getOptions.consoleLevel;
  var _transports = [new winston.transports.Console({
    level: consoleLevel,
    handleExceptions: true
  })];
  var logger = winston.createLogger({
    transports: _transports,
    exitOnError: false,
    format: environment.includes('local') ? combine(timestamp(), colorize(), localFormat) : combine(timestamp(), jsonFormat),
    defaultMeta: _extends({
      app: app,
      environment: environment
    }, GIT_COMMIT_SHORT ? {
      commit_sha: GIT_COMMIT_SHORT
    } : {})
  });
  // adding default context for every log
  var contextifyLogFn = function contextifyLogFn(logFn) {
    return function (message, ctx) {
      var source_request_id = httpContext.get('sourceRequestId');
      var request_id = httpContext.get('requestId');
      var account_id = httpContext.get('accountId');
      var org_id = httpContext.get('organizationId');
      var extendedContext = httpContext.get('extendedContext') || {};
      return logFn(_extends({
        message: message
      }, ctx, {
        environment: environment,
        app: app,
        'x-request-id': request_id
      }, source_request_id ? {
        source_request_id: source_request_id
      } : {}, account_id ? {
        account_id: account_id
      } : {}, org_id ? {
        org_id: org_id
      } : {}, extendedContext));
    };
  };
  return {
    level: consoleLevel,
    embed: function embed(expressApp) {
      expressApp.use(httpContext.middleware);
      expressApp.use(contextifyRequestMiddleware);
      expressApp.use(expressLogger(logger, consoleLevel));
    },
    debug: function debug(msg, ctx) {
      if (ctx === void 0) {
        ctx = {};
      }
      contextifyLogFn(logger.debug)(msg, ctx);
    },
    verbose: function verbose(msg, ctx) {
      if (ctx === void 0) {
        ctx = {};
      }
      contextifyLogFn(logger.verbose)(msg, ctx);
    },
    info: function info(msg, ctx) {
      if (ctx === void 0) {
        ctx = {};
      }
      contextifyLogFn(logger.info)(msg, ctx);
    },
    warn: function warn(msg, ctx) {
      if (ctx === void 0) {
        ctx = {};
      }
      contextifyLogFn(logger.warn)(msg, ctx);
    },
    error: function error(msg, _error) {
      if (_error === void 0) {
        _error = {};
      }
      var ctxError = _extends({}, _error);
      if (_error['isAxiosError']) {
        var parsed_url = parseURL(_.get(_error, 'config.url', ''));
        var queryParams = Object.assign(_.get(parsed_url, 'query', {}), _.get(_error, 'config.params', {}));
        ctxError['httpClientResponseQueryParams'] = SafeStringifyReplacer(queryParams, true);
        ctxError['httpClientResponseURL'] = _.get(_error, 'config.baseURL', '') + _.get(parsed_url, 'pathname', '');
        ctxError['httpClientResponseMethod'] = _.get(_error, 'config.method', null);
        ctxError['httpClientResponseStatusCode'] = _.get(_error, 'response.status', null);
        ctxError['httpClientResponseMessage'] = _.get(_error, 'response.data.message', null);
      }
      var request = {
        headers: httpContext.get('headers'),
        body: httpContext.get('body'),
        params: httpContext.get('params'),
        query: httpContext.get('query'),
        originalUrl: httpContext.get('originalUrl'),
        method: httpContext.get('method')
      };
      contextifyLogFn(logger.error)(msg, {
        ctxError: ctxError,
        request: request
      });
    },
    addContext: addContext
  };
}

exports.FIELDS_TO_OMIT = FIELDS_TO_OMIT;
exports.SafeStringifyReplacer = SafeStringifyReplacer;
exports.StringifyReplacer = StringifyReplacer;
exports.createLogger = createLogger;
exports.parseURL = parseURL;
//# sourceMappingURL=linode-logger.cjs.development.js.map
