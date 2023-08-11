import { transports, format, createLogger as wCreateLogger } from 'winston';
import httpContext from 'express-http-context';
import _ from 'lodash';
import { expressLogger, contextifyRequestMiddleware } from './middlewares';
import { SafeStringifyReplacer, parseURL } from './utils';
const { combine, timestamp, printf, colorize } = format;

const DEFAULT_OPTIONS = {
  consoleLevel: 'debug'
};

const jsonFormat = printf(({ level, timestamp, message = '', ...ctx }) =>
  SafeStringifyReplacer({ timestamp, level, message, ctx }, true)
);

const localFormat = printf(
  ({ level, timestamp, message = '', error, ...ctx }) =>
    `${timestamp} [${level}]: ${SafeStringifyReplacer({ message, ctx }, false)}\n` +
    `${error ? SafeStringifyReplacer(error, false, 2) : ''}`
);

const getOptions = (options = {}) => {
  return Object.assign({}, DEFAULT_OPTIONS, process.env, options) as any;
};

function addContext(key, value) {
  httpContext.set('extendedContext', {
    ...(httpContext.get('extendedContext') || {}),
    [key]: value
  });
}

export function createLogger(options) {
  const { GIT_COMMIT_SHORT, app, environment, consoleLevel } = getOptions(options);

  const _transports = [
    new transports.Console({
      level: consoleLevel,
      handleExceptions: true
    })
  ];

  const logger = wCreateLogger({
    transports: _transports,
    exitOnError: false,
    format: environment.includes('local')
      ? combine(timestamp(), colorize(), localFormat)
      : combine(timestamp(), jsonFormat),

    defaultMeta: {
      app,
      environment,
      ...(GIT_COMMIT_SHORT ? { commit_sha: GIT_COMMIT_SHORT } : {})
    }
  });

  // adding default context for every log
  const contextifyLogFn = logFn => (message, ctx) => {
    const source_request_id = httpContext.get('sourceRequestId');
    const request_id = httpContext.get('requestId');
    const account_id = httpContext.get('accountId');
    const org_id = httpContext.get('organizationId');
    const extendedContext = httpContext.get('extendedContext') || {};

    return logFn({
      message,
      ...ctx,
      environment,
      app,
      'x-request-id': request_id,
      ...(source_request_id ? { source_request_id } : {}),
      ...(account_id ? { account_id } : {}),
      ...(org_id ? { org_id } : {}),
      ...extendedContext
    });
  };

  return {
    level: consoleLevel,
    embed(expressApp) {
      expressApp.use(httpContext.middleware);
      expressApp.use(contextifyRequestMiddleware);
      expressApp.use(expressLogger(logger, consoleLevel));
    },
    debug(msg: string, ctx = {}) {
      contextifyLogFn(logger.debug)(msg, ctx);
    },
    verbose(msg: string, ctx = {}) {
      contextifyLogFn(logger.verbose)(msg, ctx);
    },
    info(msg: string, ctx = {}) {
      contextifyLogFn(logger.info)(msg, ctx);
    },
    warn(msg: string, ctx = {}) {
      contextifyLogFn(logger.warn)(msg, ctx);
    },
    error(msg: string, error = {}) {
      let ctxError = { ...error };
      if (error['isAxiosError']) {
        let parsed_url = parseURL(_.get(error, 'config.url', ''));
        let queryParams = Object.assign(
          _.get(parsed_url, 'query', {}),
          _.get(error, 'config.params', {})
        );
        ctxError['httpClientResponseQueryParams'] = SafeStringifyReplacer(queryParams, true);
        ctxError['httpClientResponseURL'] =
          _.get(error, 'config.baseURL', '') + _.get(parsed_url, 'pathname', '');
        ctxError['httpClientResponseMethod'] = _.get(error, 'config.method', null);
        ctxError['httpClientResponseStatusCode'] = _.get(error, 'response.status', null);
        ctxError['httpClientResponseMessage'] = _.get(error, 'response.data.message', null);
      }
      const request = {
        headers: httpContext.get('headers'),
        body: httpContext.get('body'),
        params: httpContext.get('params'),
        query: httpContext.get('query'),
        originalUrl: httpContext.get('originalUrl'),
        method: httpContext.get('method')
      };
      contextifyLogFn(logger.error)(msg, { ctxError, request });
    },
    addContext
  };
}

export * from './utils';
