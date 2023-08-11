"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatadogConnect = void 0;
const StatsD = require('node-statsd');
const getRoute = ({ originalUrl }) => originalUrl || '';
const createDatadogConnect = ({ stats_d_client, stat, tags = [], method, response_code = false }) => {
    const dataDog = new StatsD(stats_d_client);
    return (req, res, next) => {
        if (!req._startTime) {
            req._startTime = new Date();
        }
        // events are synchronous and blocking
        res.on('finish', function () {
            const statTags = [...tags];
            const route = getRoute(req)
                .split('?')[0]
                .replace(/[0-9]+/g, '_');
            statTags.push(`path:${route}`);
            const organizationId = req.headers.organization_id;
            if (method) {
                statTags.push(`method:${req.method.toLowerCase()}`);
            }
            if (response_code) {
                if (res.statusCode >= 500) {
                    statTags.push(`org_id:${organizationId}`);
                }
                statTags.push(`response_code:${res.statusCode}`);
                dataDog.increment(`${stat}.response_code.${res.statusCode}`, 1, statTags);
            }
            dataDog.gauge(`${stat}.response_time`, Date.now() - req._startTime.getTime(), statTags);
        });
        next();
    };
};
exports.createDatadogConnect = createDatadogConnect;
//# sourceMappingURL=data-dog.middleware.js.map