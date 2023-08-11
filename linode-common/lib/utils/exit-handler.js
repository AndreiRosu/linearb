'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagerDutyTriggerIncident = exports.stopServerGracefully = void 0;
const axios_1 = __importDefault(require("axios"));
/*
dont index this file
 */
const promise_utils_1 = require("./promise-utils");
const shutdownGracePeriod = 15 * 1000;
//we need to delay and fail the readiness prod on sigterm before stopping server
const readinessGrace = 10 * 1000;
function stopServer(server, logger) {
    return new Promise((resolve, reject) => {
        //it stops the server from accepting new connections,
        //but it keeps the existing connections open indefinitely.
        if (!server)
            resolve(null);
        server.close(err => {
            if (err)
                reject(err);
            logger.warn('http server stopped receiving connections');
            server.getConnections((err, count) => {
                logger.warn(`number of pending connections: ${count}`);
                resolve(null);
            });
        });
    });
}
async function stopServerGracefully(signal, logger, server, args) {
    logger.warn(`signal ${signal} received.`);
    if (process['exitTimeoutPromise']) {
        return;
    }
    process['exitTimeoutPromise'] = (0, promise_utils_1.delay)(readinessGrace)
        .then(async () => await stopServer(server, logger))
        .then(async () => {
        logger.warn(`waiting for existing connections ${shutdownGracePeriod}ms`);
        return await (0, promise_utils_1.delay)(shutdownGracePeriod);
    })
        .then(async () => {
        if (args.pg)
            await args.pg.destroy();
        if (args.pool)
            await args.pool.end();
    })
        .catch(logger.error)
        .finally(() => {
        logger.warn('server exiting...');
        process.exit(1);
    });
    //hard limit, although ecs will sent sigkill after 30 sec
    //delay(shutdownGracePeriod * 2).then(() => process.exit(1));
}
exports.stopServerGracefully = stopServerGracefully;
async function pagerDutyTriggerIncident(logger, serviceName, message, severity, pagerRoutingKeyVal, env, eventName = null, event_action = 'trigger') {
    if (eventName)
        logger.warn(`Event: ${eventName} received.`);
    if (env === 'production' || env === 'prod') {
        const url = 'https://events.pagerduty.com/v2/enqueue';
        const eventParameters = {
            routing_key: pagerRoutingKeyVal,
            event_action: event_action,
            payload: {
                summary: message,
                source: serviceName,
                severity: severity,
                timestamp: new Date().toISOString()
            }
        };
        try {
            await axios_1.default.post(url, eventParameters);
        }
        catch (err) {
            logger.error(`PagerDuty - an error occured while publishing an incident: ${err}`);
        }
        logger.info('PagerDuty - event published successfully');
    }
    else {
        logger.info('PagerDuty - skip triggering a pager event as running in a non-prod environment');
    }
}
exports.pagerDutyTriggerIncident = pagerDutyTriggerIncident;
//# sourceMappingURL=exit-handler.js.map