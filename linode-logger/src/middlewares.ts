import morgan from 'morgan';
import _ from 'lodash';
import httpContext from 'express-http-context';
import { v4 } from 'uuid';
import { FIELDS_TO_OMIT } from './utils';

/**
 each request will have all of the context
 */
export function contextifyRequestMiddleware(req, res, next) {
  const accountId = _.get(req, 'headers.id', '').toString();
  const organizationId = _.get(req, 'headers.organization_id', '').toString();
  const headerRequestId = _.get(req, 'headers.x-request-id', null);
  const headerSourceRequestId = _.get(req, 'headers.source-x-request-id', null);
  const queryRequestId = _.get(req, 'query.x-request-id', null);
  const querySourceRequestId = _.get(req, 'query.source-x-request-id', null);
  const requestId = headerRequestId || queryRequestId || v4();
  const sourceRequestId = headerSourceRequestId || querySourceRequestId;
  const amznTraceId = _.get(req, 'headers.x-amzn-trace-id', null);

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

export function expressLogger(logger, consoleLevel) {
  return morgan(
    function (tokens, req, res) {
      const amznTraceId = httpContext.get('amznTraceId');
      const logInfo = {
        method: tokens.method(req, res),
        status: Number(tokens.status(req, res)),
        url: tokens.url(req, res),
        headers: httpContext.get('headers'),
        'response-time': `${tokens['response-time'](req, res)} ms`,
        'x-request-id': httpContext.get('requestId'),
        body: httpContext.get('body'),
        query: httpContext.get('query'),
        ...(amznTraceId ? { [`x-amzn-trace-id`]: amznTraceId } : {})
      };
      const noQsUrl = (logInfo.url || '').split('?')[0];
      logInfo.status < 400
        ? logger.debug('', logInfo)
        : logger.error(`[Extended log]: ${logInfo.status} ${logInfo.method} ${noQsUrl}`, logInfo);
    },
    {
      stream: {
        //dont use write stream as we return null from the above custom formatter, and output msg from it
        write: function (msg) {}
      },
      skip: function (req, res) {
        return res.statusCode > 199 && res.statusCode < 400 && consoleLevel !== 'debug';
      }
    }
  );
}
